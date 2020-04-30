FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-buster-slim AS base
WORKDIR /app
EXPOSE 80
EXPOSE 433

FROM mcr.microsoft.com/dotnet/core/sdk:3.1-buster AS build
WORKDIR /src
COPY src/DonateTo.ApplicationCore/*.csproj DonateTo.ApplicationCore/
COPY src/DonateTo.Infrastructure/*.csproj DonateTo.Infrastructure/
COPY src/DonateTo.Services/*.csproj DonateTo.Services/
COPY src/DonateTo.IdentityServer/*.csproj DonateTo.IdentityServer/
RUN dotnet restore DonateTo.IdentityServer/DonateTo.IdentityServer.csproj --no-cache
COPY . .

WORKDIR "src/DonateTo.IdentityServer"
RUN dotnet build DonateTo.IdentityServer.csproj -c Release -o /app/build

FROM build as publish

RUN dotnet publish DonateTo.IdentityServer.csproj -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet","DonateTo.IdentityServer.dll"]