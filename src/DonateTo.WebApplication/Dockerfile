FROM mcr.microsoft.com/dotnet/core/sdk:3.1 AS build-env
WORKDIR /app

COPY DonateTo.ApplicationCore/*.csproj ./DonateTo.ApplicationCore/
COPY DonateTo.Infrastructure/*.csproj ./DonateTo.Infrastructure/
COPY DonateTo.Services/*.csproj ./DonateTo.Services/
COPY DonateTo.WebApplication/*.csproj ./DonateTo.WebApplication/
RUN dotnet restore DonateTo.WebApplication/DonateTo.WebApplication.csproj --no-cache

COPY DonateTo.ApplicationCore/ ./DonateTo.ApplicationCore/
COPY DonateTo.Infrastructure/ ./DonateTo.Infrastructure/
COPY DonateTo.Services/ ./DonateTo.Services/
COPY DonateTo.WebApplication/ ./DonateTo.WebApplication/
RUN dotnet restore DonateTo.WebApplication/DonateTo.WebApplication.csproj -c Release -o ../out

FROM build-env AS publish
RUN dotnet publish "DonateTo.WebApplication.csproj" -c Release -o /app
ENTRYPOINT ["dotnet","DonateTo.WebApplication.dll"]

