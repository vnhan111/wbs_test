# WBS Backend Tests

Dự án xUnit test cho WBS Backend API.

## Cấu trúc

```
WBS_backend.Tests/
├── Controllers/
│   ├── AuthControllerTests.cs      # Tests cho authentication endpoints
│   └── ProjectControllerTests.cs   # Tests cho project management endpoints
```

## Công nghệ sử dụng

- **xUnit** - Framework test chính
- **Moq** - Library để tạo mock objects
- **FluentAssertions** - Library assertion để viết test dễ đọc hơn
- **Microsoft.AspNetCore.Mvc.Testing** - Testing utilities cho ASP.NET Core

## Chạy Tests

### Chạy tất cả tests
```bash
cd WBS_backend.Tests
dotnet test
```

### Chạy tests với chi tiết
```bash
dotnet test --verbosity normal
```

### Chạy tests của một controller cụ thể
```bash
dotnet test --filter "FullyQualifiedName~ProjectControllerTests"
dotnet test --filter "FullyQualifiedName~AuthControllerTests"
```

### Chạy một test cụ thể
```bash
dotnet test --filter "GetProjects_ReturnsOkResult_WithListOfProjects"
```

## Chi tiết Tests

### AuthControllerTests (12 tests)

**Register Tests:**
- ✅ Register_ReturnsOkResult_WhenRegistrationSuccessful
- ✅ Register_ReturnsBadRequest_WhenInvalidOperationExceptionThrown
- ✅ Register_ReturnsInternalServerError_WhenExceptionThrown

**Login Tests:**
- ✅ Login_ReturnsOkResult_WithToken_WhenCredentialsAreValid
- ✅ Login_ReturnsUnauthorized_WhenCredentialsAreInvalid
- ✅ Login_ReturnsUnauthorized_WhenTokenIsNull

**VerifyEmail Tests:**
- ✅ VerifyEmail_ReturnsOkResult_WhenVerificationSuccessful
- ✅ VerifyEmail_ReturnsBadRequest_WhenInvalidOperationExceptionThrown
- ✅ VerifyEmail_ReturnsInternalServerError_WhenExceptionThrown
- ✅ VerifyEmail_HandlesEmptyEmail
- ✅ VerifyEmail_HandlesEmptyCode

### ProjectControllerTests (14 tests)

**GetProjects Tests:**
- ✅ GetProjects_ReturnsOkResult_WithListOfProjects
- ✅ GetProjects_ReturnsEmptyList_WhenNoProjectsExist

**GetProjectById Tests:**
- ✅ GetProjectById_ReturnsOkResult_WhenProjectExists
- ✅ GetProjectById_ReturnsNotFound_WhenProjectDoesNotExist
- ✅ GetProjectById_ReturnsInternalServerError_WhenExceptionThrown

**PostProject Tests:**
- ✅ PostProject_ReturnsOkResult_WithCreatedProject
- ✅ PostProject_ReturnsBadRequest_WhenModelStateIsInvalid
- ✅ PostProject_ReturnsBadRequest_WhenArgumentExceptionThrown
- ✅ PostProject_ReturnsInternalServerError_WhenExceptionThrown

**PatchProjectById Tests:**
- ✅ PatchProjectById_ReturnsOkResult_WhenUpdateSuccessful
- ✅ PatchProjectById_ReturnsNotFound_WhenProjectDoesNotExist
- ✅ PatchProjectById_ReturnsInternalServerError_WhenExceptionThrown

**DeleteProjectById Tests:**
- ✅ DeleteProjectById_ReturnsOkResult_WhenDeleteSuccessful
- ✅ DeleteProjectById_ReturnsBadRequest_WhenProjectNotFoundOrAlreadyDeleted
- ✅ DeleteProjectById_ReturnsNotFound_WhenKeyNotFoundExceptionThrown

## Mô hình Test

Tất cả tests sử dụng mô hình **AAA (Arrange-Act-Assert)**:

```csharp
[Fact]
public async Task MethodName_ExpectedBehavior_Condition()
{
    // Arrange - Chuẩn bị dữ liệu và mock objects
    var mockData = ...;
    _mockService.Setup(s => s.Method()).ReturnsAsync(mockData);
    
    // Act - Thực thi method cần test
    var result = await _controller.Method();
    
    // Assert - Kiểm tra kết quả
    Assert.IsType<OkObjectResult>(result);
    result.Should().BeEquivalentTo(expected);
}
```

## Best Practices

1. **Mocking**: Tất cả dependencies đều được mock để test độc lập
2. **Naming Convention**: Test names theo format `MethodName_ExpectedBehavior_Condition`
3. **Coverage**: Mỗi endpoint có tests cho:
   - Success case
   - Not found case
   - Error handling cases
   - Validation cases
4. **FluentAssertions**: Sử dụng để có assertion dễ đọc hơn

## Thêm Tests Mới

Để thêm test mới:

1. Tạo file test trong thư mục `Controllers/`
2. Kế thừa naming convention
3. Mock các dependencies cần thiết
4. Viết tests theo mô hình AAA
5. Chạy `dotnet test` để verify

Ví dụ:

```csharp
public class NewControllerTests
{
    private readonly Mock<INewService> _mockService;
    private readonly NewController _controller;

    public NewControllerTests()
    {
        _mockService = new Mock<INewService>();
        _controller = new NewController(_mockService.Object);
    }

    [Fact]
    public async Task GetData_ReturnsOkResult_WhenDataExists()
    {
        // Test implementation
    }
}
```

## Kết quả Test

```
Test summary: total: 26, failed: 0, succeeded: 26, skipped: 0
```

✅ Tất cả 26 tests đều pass thành công!
