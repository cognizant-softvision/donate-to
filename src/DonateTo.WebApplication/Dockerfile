FROM mcr.microsoft.com/dotnet/core/sdk:3.1 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/core/sdk:3.1 AS build
WORKDIR /src
COPY src/DonateTo.ApplicationCore/*.csproj DonateTo.ApplicationCore/
COPY src/DonateTo.Infrastructure/*.csproj DonateTo.Infrastructure/
COPY src/DonateTo.Services/*.csproj DonateTo.Services/
COPY src/DonateTo.WebApplication/*.csproj DonateTo.WebApplication/
RUN dotnet restore DonateTo.WebApplication/DonateTo.WebApplication.csproj --no-cache
COPY . .

WORKDIR "src/DonateTo.WebApplication"
RUN dotnet build DonateTo.WebApplication.csproj -c Release -o /app/build

FROM build as publish

RUN apt-get update -yq && apt-get upgrade -yq && apt-get install -yq curl git nano
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash - && apt-get install -yq nodejs build-essential

RUN dotnet publish DonateTo.WebApplication.csproj -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet","DonateTo.WebApplication.dll"]