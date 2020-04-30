FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-buster-slim AS base
WORKDIR /app
EXPOSE 80
EXPOSE 433

FROM mcr.microsoft.com/dotnet/core/sdk:3.1-buster AS build
WORKDIR /src
COPY src/DonateTo.ApplicationCore/*.csproj DonateTo.ApplicationCore/
COPY src/DonateTo.Infrastructure/*.csproj DonateTo.Infrastructure/
COPY src/DonateTo.Services/*.csproj DonateTo.Services/
COPY src/DonateTo.WebApi/*.csproj DonateTo.WebApi/
RUN dotnet restore DonateTo.WebApi/DonateTo.WebApi.csproj --no-cache
COPY . .

WORKDIR "src/DonateTo.WebApi"
RUN dotnet build DonateTo.WebApi.csproj -c Release -o /app/build

FROM build as publish

RUN dotnet publish DonateTo.WebApi.csproj -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet","DonateTo.WebApi.dll"]