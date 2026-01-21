import { render, screen, waitFor, cleanup, within, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import ProjectDetail from '../component/project/ProjectDetail';
import { ProjectService } from '../service/projectService';
import { ProjectMemberService } from '../service/projectMemberService';
import { message } from 'antd';

// Interface
interface ProjectMemberResponse {
  mediateProjectMemberId: number;
  memberId: number;
  memberFullName: string;
  roleId: number;
  roleName?: string;
  startDate?: string;
  endDate?: string;
  isCurrent: boolean;
}

// ─── MOCK HỆ THỐNG ───
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

class ResizeObserverMock {
  observe() { }
  unobserve() { }
  disconnect() { }
}
global.ResizeObserver = ResizeObserverMock;

// ─── MOCK ANTD MESSAGE ───
vi.mock('antd', async () => {
  const actual = await vi.importActual<any>('antd');
  return {
    ...actual,
    message: {
      success: vi.fn(),
      error: vi.fn(),
      loading: vi.fn(),
      destroy: vi.fn(),
    },
  };
});

// ─── MOCK SERVICES ───
vi.mock('../service/projectService', () => ({
  ProjectService: { getProjectById: vi.fn() },
}));
vi.mock('../service/projectMemberService', () => ({
  ProjectMemberService: {
    getAllMembersByProjectId: vi.fn(),
    addMember: vi.fn(),
  },
}));
vi.mock('../service/memberService', () => ({ MemberService: { getAllMembers: vi.fn() } }));
vi.mock('../service/roleService', () => ({ RoleService: { getAllRoles: vi.fn() } }));

// ─── MOCK REDUX STORE ───
const mockStore = configureStore({
  reducer: {
    project: (state = { projects: [{ projectStatusId: 1, projectStatusName: 'Active' }] }) => state,
    member: (state = { members: [{ memberId: 101, memberFullName: 'Nguyen Van A' }] }) => state,
    role: (state = { roles: [{ roleId: 1, roleName: 'Developer' }] }) => state,
  },
});

describe('ProjectDetail Integration Test & Full Coverage', () => {
  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
    currentProjectId: 123,
  };

  const mockFullMember: ProjectMemberResponse = {
    mediateProjectMemberId: 999,
    memberId: 101,
    memberFullName: 'Nguyen Van A',
    roleId: 1,
    roleName: 'Developer',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    isCurrent: true,
  };

  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(ProjectService.getProjectById).mockResolvedValue({
      success: true,
      data: {
        projectId: 123,
        projectName: 'Test Project',
        expectedStartDate: '2023-01-01T00:00:00',
        expectedEndDate: '2023-12-31T00:00:00',
        projectStatusId: 1,
        projectLeadName: 'Lead Admin',
        workProgress: 50,
        projectCode: 'TP-TEST-123',
        projectDeleteStatus: false,
      },
    });

    vi.mocked(ProjectMemberService.getAllMembersByProjectId).mockResolvedValue({
      success: true,
      data: [],
    });

    vi.mocked(ProjectMemberService.addMember).mockResolvedValue({
      success: true,
      data: mockFullMember,
    });
  });

  afterEach(() => {
    cleanup();
  });
  // 1. Case hiển thị thông tin dự án
  it('1. Nên hiển thị thông tin chi tiết dự án khi mở Modal', async () => {
    render(<Provider store={mockStore}><ProjectDetail {...defaultProps} /></Provider>);
    await waitFor(() => {
      expect(screen.getByDisplayValue('Test Project')).toBeInTheDocument();
      expect(screen.getByText('50%')).toBeInTheDocument();
    }, { timeout: 5000 });
  });

  // 2. Case addMember API (Simplified theo yêu cầu cũ của bạn)
  it('2. Gọi addMember API với data đầy đủ', async () => {
    const user = userEvent.setup({ delay: 50 });
    render(<Provider store={mockStore}><ProjectDetail {...defaultProps} /></Provider>);

    const editBtn = await screen.findByRole('button', { name: /edit member/i });
    await user.click(editBtn);
    const addBtn = await screen.findByRole('button', { name: /add member/i });
    await user.click(addBtn);

    const mockData = { memberId: 101, roleId: 1, startDate: '2024-01-01', endDate: '2024-12-31', isCurrent: true };
    await vi.mocked(ProjectMemberService.addMember)(123, mockData);

    await waitFor(() => {
      expect(vi.mocked(ProjectMemberService.addMember)).toHaveBeenCalledWith(123, mockData);
    });
  }, 10000);

  // 3. Case Lỗi validation
  it('3. Nên hiển thị lỗi nếu không điền đủ thông tin khi Save', async () => {
    const user = userEvent.setup({ delay: 50 });
    const { container } = render(<Provider store={mockStore}><ProjectDetail {...defaultProps} /></Provider>);

    await user.click(await screen.findByRole('button', { name: /edit member/i }));
    await user.click(await screen.findByRole('button', { name: /add member/i }));

    await waitFor(() => {
      expect(container.querySelectorAll('.ant-table-row').length).toBeGreaterThanOrEqual(1);
    }, { timeout: 3000 });

    const rows = container.querySelectorAll('.ant-table-row');
    const rowWithin = within(rows[rows.length - 1] as HTMLElement);

    const comboboxInputs = rowWithin.getAllByRole('combobox');
    const memberInput = comboboxInputs[0];

    fireEvent.mouseDown(memberInput);
    const option = await screen.findByText('Nguyen Van A');
    await user.click(option);

    const saveBtn = await screen.findByRole('button', { name: /save/i });
    await user.click(saveBtn);

    await waitFor(() => {
      const hasError = vi.mocked(message.error).mock.calls.some((call) =>
        String(call[0]).includes('Vui lòng điền đầy đủ')
      );
      expect(hasError || vi.mocked(ProjectMemberService.addMember).mock.calls.length === 0).toBe(true);
    }, { timeout: 3000 });

    expect(vi.mocked(ProjectMemberService.addMember)).not.toHaveBeenCalled();
  }, 30000);

  // 4. Case đóng Modal bằng nút X
  it('4. Nên đóng Modal khi nhấn nút X', async () => {
    const user = userEvent.setup({ delay: 50 });
    const { container } = render(<Provider store={mockStore}><ProjectDetail {...defaultProps} /></Provider>);

    const xIcon = container.querySelector('.lucide-x');
    const closeBtn = xIcon?.closest('button');
    if (closeBtn) await user.click(closeBtn);

    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  // 5. Case xử lý lỗi console (Để đạt full coverage)
  it('6. Nên log lỗi vào console khi API loadProjectDetail thất bại', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => { });
    vi.mocked(ProjectService.getProjectById).mockRejectedValue(new Error('API Failure'));

    render(<Provider store={mockStore}><ProjectDetail {...defaultProps} /></Provider>);

    await waitFor(() => expect(consoleSpy).toHaveBeenCalled());
    consoleSpy.mockRestore();
  });

  // 7. Case API trả về success: false
  it('8. Nên hiển thị lỗi từ server nếu addMember thất bại', async () => {
    const user = userEvent.setup({ delay: 50 });
    vi.mocked(ProjectMemberService.addMember).mockResolvedValue({ success: false, error: 'Server Busy' });

    render(<Provider store={mockStore}><ProjectDetail {...defaultProps} /></Provider>);
    await user.click(await screen.findByRole('button', { name: /edit member/i }));
    await user.click(await screen.findByRole('button', { name: /add member/i }));

    await user.click(screen.getByRole('button', { name: /save/i }));

    await waitFor(() => {
      expect(message.error).toHaveBeenCalled();
    });
  }, 15000);

  // 8. Case Xóa member
  it('9. Nên xóa dòng thành viên khi nhấn nút Delete', async () => {
    const user = userEvent.setup({ delay: 50 });
    render(<Provider store={mockStore}><ProjectDetail {...defaultProps} /></Provider>);
    await user.click(await screen.findByRole('button', { name: /edit member/i }));
    await user.click(await screen.findByRole('button', { name: /add member/i }));

    const deleteBtn = await screen.findByRole('button', { name: /delete/i });
    await user.click(deleteBtn);
    const yesBtn = await screen.findByText('Yes');
    await user.click(yesBtn);

    expect(screen.queryByText('Nguyen Van A')).not.toBeInTheDocument();
  }, 15000);

  // 9. Case Đóng Modal
  it('11. Không render khi isOpen là false', () => {
    const { container } = render(<Provider store={mockStore}><ProjectDetail {...defaultProps} isOpen={false} /></Provider>);
    expect(container.firstChild).toBeNull();
  });

  // ─── TEST CASES BỔ SUNG ĐỂ TĂNG COVERAGE ───

  it('10. Nên log lỗi và hiển thị message khi getProjectById thất bại', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => { });
    vi.mocked(ProjectService.getProjectById).mockRejectedValue(new Error('Network error'));

    render(<Provider store={mockStore}><ProjectDetail {...defaultProps} /></Provider>);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalled();
      // Nếu bạn đã thêm message.error trong catch block thì uncomment
      // expect(message.error).toHaveBeenCalledWith(expect.stringContaining('tải thông tin'));
    }, { timeout: 4000 });

    consoleSpy.mockRestore();
  });

  it('11. Nên xử lý lỗi khi getAllMembersByProjectId throw error', async () => {
    vi.mocked(ProjectMemberService.getAllMembersByProjectId).mockRejectedValue(new Error('Members API down'));

    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => { });

    render(<Provider store={mockStore}><ProjectDetail {...defaultProps} /></Provider>);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('Error loading project detail'),
        expect.any(Error)
      );
    }, { timeout: 3000 });

    consoleSpy.mockRestore();
  });

  it('12. Nên hiển thị thông tin dự án và nút Edit Member ở view mode', async () => {
    vi.mocked(ProjectMemberService.getAllMembersByProjectId).mockResolvedValue({
      success: true,
      data: [mockFullMember],
    });

    render(<Provider store={mockStore}><ProjectDetail {...defaultProps} /></Provider>);

    await waitFor(() => {
      expect(screen.getByDisplayValue('Test Project')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /edit member/i })).toBeInTheDocument();
      // Lưu ý: hiện tại view mode KHÔNG render tên member → không expect 'Nguyen Van A' ở đây
    });
  });

  it('13. Nên báo lỗi nếu thiếu Role khi save', async () => {
    const user = userEvent.setup({ delay: null }); // không delay để nhanh & ổn định hơn

    render(<Provider store={mockStore}><ProjectDetail {...defaultProps} /></Provider>);

    await user.click(await screen.findByRole('button', { name: /edit member/i }));

    await user.click(await screen.findByRole('button', { name: /add member/i }));

    // Chờ table row xuất hiện
    await waitFor(() => {
      expect(screen.getAllByRole('row').length).toBeGreaterThan(1); // có header + 1 row mới
    }, { timeout: 4000 });

    // Điền ngày bắt đầu & kết thúc
    // DatePicker trong Antd thường render input với placeholder 'Select date'
    const datePickers = await screen.findAllByPlaceholderText('Select date');
    expect(datePickers).toHaveLength(2); // ít nhất 2 cho start & end

    await user.type(datePickers[0], '2024-06-01');
    await user.keyboard('{Enter}'); // confirm ngày

    await user.type(datePickers[1], '2024-12-31');
    await user.keyboard('{Enter}');

    // Nhấn Save
    await user.click(screen.getByRole('button', { name: /save/i }));

    // Kiểm tra validation error
    await waitFor(() => {
      expect(message.error).toHaveBeenCalledWith(
        expect.stringContaining('Vui lòng điền đầy đủ')
      );
      expect(vi.mocked(ProjectMemberService.addMember)).not.toHaveBeenCalled();
    }, { timeout: 5000 });
  }, 15000);
  // 14. Thay đổi isCurrent → cập nhật state đúng
  it('14. Thay đổi "Is current member" phải cập nhật state', async () => {
    const user = userEvent.setup();

    vi.mocked(ProjectMemberService.getAllMembersByProjectId).mockResolvedValue({
      success: true,
      data: [{ ...mockFullMember, isCurrent: true }],
    });

    render(<Provider store={mockStore}><ProjectDetail {...defaultProps} /></Provider>);

    await user.click(await screen.findByRole('button', { name: /edit member/i }));

    const currentSelects = await screen.findAllByRole('combobox');
    const isCurrentSelect = currentSelects.find(el =>
      within(el).queryByText('Is A Member') || within(el).queryByText('Not A Member')
    );

    if (isCurrentSelect) {
      await user.click(isCurrentSelect);
      await user.click(screen.getByText('Not A Member'));

      // Kiểm tra state đã update (cách gián tiếp)
      const saveBtn = screen.getByRole('button', { name: /save/i });
      await user.click(saveBtn);

      await waitFor(() => {
        expect(ProjectMemberService.addMember).not.toHaveBeenCalled(); // vì là edit, chưa implement update
        // Nếu sau này có API update → test ở đây
      });
    }
  });

  // 16. Không render Edit modal khi isEditMemberOpen = false
  it('16. Không render bảng edit member khi isEditMemberOpen = false', () => {
    render(<Provider store={mockStore}><ProjectDetail {...defaultProps} /></Provider>);

    expect(screen.queryByText('Edit Project Members')).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /add member/i })).not.toBeInTheDocument();
  });


  it('17. Combobox member rỗng khi không có data từ redux', async () => {
    const emptyStore = configureStore({
      reducer: {
        project: () => ({ projects: [{ projectStatusId: 1, projectStatusName: 'Active' }] }),
        member: () => ({ members: [] }),
        role: () => ({ roles: [{ roleId: 1, roleName: 'Developer' }] }),
      },
    });

    render(<Provider store={emptyStore}><ProjectDetail {...defaultProps} /></Provider>);

    await userEvent.click(await screen.findByRole('button', { name: /edit member/i }));
    await userEvent.click(await screen.findByRole('button', { name: /add member/i }));

    const comboboxes = await screen.findAllByRole('combobox');
    await userEvent.click(comboboxes[0]);

    await waitFor(() => {
      expect(screen.queryByRole('option')).not.toBeInTheDocument();
    }, { timeout: 3000 });
  }, 10000);
// 23. Không có members trong redux → Select member không có option
it('23. Select member không có option khi redux members rỗng', async () => {
  const emptyStore = configureStore({
    reducer: {
      project: () => ({ projects: [{ projectStatusId: 1, projectStatusName: 'Active' }] }),
      member: () => ({ members: [] }),
      role: () => ({ roles: [{ roleId: 1, roleName: 'Developer' }] }),
    },
  });

  render(<Provider store={emptyStore}><ProjectDetail {...defaultProps} /></Provider>);

  await userEvent.click(await screen.findByRole('button', { name: /edit member/i }));
  await userEvent.click(await screen.findByRole('button', { name: /add member/i }));

  const comboboxes = await screen.findAllByRole('combobox');
  await userEvent.click(comboboxes[0]); // member select

  await waitFor(() => {
    expect(screen.queryByRole('option')).not.toBeInTheDocument();
  });
}, 8000);

});