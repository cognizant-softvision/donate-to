FROM mcr.microsoft.com/dotnet/core/sdk:3.1 AS build-env
WORKDIR /app

COPY DonateTo.ApplicationCore/*.csproj ./DonateTo.ApplicationCore/
COPY DonateTo.Infrastructure/*.csproj ./DonateTo.Infrastructure/
COPY DonateTo.Services/*.csproj ./DonateTo.Services/
COPY DonateTo.IdentityServer/*.csproj ./DonateTo.IdentityServer/
RUN dotnet restore DonateTo.IdentityServer/DonateTo.IdentityServer.csproj --no-cache

COPY DonateTo.ApplicationCore/ ./DonateTo.ApplicationCore/
COPY DonateTo.Infrastructure/ ./DonateTo.Infrastructure/
COPY DonateTo.Services/ ./DonateTo.Services/
COPY DonateTo.IdentityServer/ ./DonateTo.IdentityServer/
RUN dotnet restore DonateTo.IdentityServer/DonateTo.IdentityServer.csproj -c Release -o ../out

FROM build-env AS publish
RUN dotnet publish "DonateTo.IdentityServer.csproj" -c Release -o /app
ENTRYPOINT ["dotnet","DonateTo.IdentityServer.dll"]

