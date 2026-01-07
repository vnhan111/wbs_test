using WBS_backend.DTOs;

namespace WBS_backend.Services
{
    public interface IProjectService
    {
        Task<List<ProjectResponseDto>> GetAllProjectAsync();
    }
}