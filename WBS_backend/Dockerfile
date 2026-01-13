FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
 
COPY ["WBS_backend.csproj", "./"]
RUN dotnet restore "WBS_backend.csproj"
 
COPY . .
 
RUN dotnet publish "WBS_backend.csproj" \
    -c Release \
    -o /app/publish \
    --no-restore
 
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
 
USER $APP_UID
 
WORKDIR /app
 
COPY --from=build /app/publish .
 
EXPOSE 8080
 
ENV ASPNETCORE_URLS=http://+:8080
ENV ASPNETCORE_ENVIRONMENT=Production
ENV TZ=Asia/Ho_Chi_Minh
ENV ConnectionStrings__DefaultConnection="Server=host.docker.internal;Port=3306;Database=demo_wbs;User=root;Password=dev-only-change-this-immediately;Charset=utf8mb4;Allow User Variables=True;"
ENTRYPOINT ["dotnet", "WBS_backend.dll"]