FROM mcr.microsoft.com/dotnet/core/sdk:3.1 AS build-env
WORKDIR /app

COPY DonateTo.ApplicationCore/*.csproj ./DonateTo.ApplicationCore/
COPY DonateTo.Infrastructure/*.csproj ./DonateTo.Infrastructure/
COPY DonateTo.Services/*.csproj ./DonateTo.Services/
COPY DonateTo.WebApi/*.csproj ./DonateTo.WebApi/
RUN dotnet restore DonateTo.WebApi/DonateTo.WebApi.csproj --no-cache

COPY DonateTo.ApplicationCore/ ./DonateTo.ApplicationCore/
COPY DonateTo.Infrastructure/ ./DonateTo.Infrastructure/
COPY DonateTo.Services/ ./DonateTo.Services/
COPY DonateTo.WebApi/ ./DonateTo.WebApi/
RUN dotnet restore DonateTo.WebApi/DonateTo.WebApi.csproj -c Release -o ../out

FROM build-env AS publish
RUN dotnet publish "DonateTo.WebApi.csproj" -c Release -o /app
ENTRYPOINT ["dotnet","DonateTo.WebApi.dll"]

