$dir = 'src\DonateTo.Infrastructure\Data\Migrations'
$migrations = Get-ChildItem -Path $dir -Recurse -Filter *.cs
$contextDb = "DonateToDbContext"
$startUp = '.\src\DonateTo.WebApi\DonateTo.WebApi.csproj'

function CheckContainerStatus() {
   if ((docker inspect donateto_postgres).count -eq 1) {
      Write-Output "Container does not Exist."
      Write-Output "Start PostgreDb Build."
      docker-compose up -d --build postgres_donateto
      Write-Output "Finishing PostgreDb Build."
   }
   else {
      Write-Output "Container Down."
      Write-Output "Starting Container."
      docker-compose up -d postgres_donateto
      Write-Output "Container Up."
   }
}

function ApplyMigration() {
   Write-Output "Start Applying Migrations"
   dotnet ef database update --startup-project  $startUp --context $contextDb --verbose 
   Write-Output "Finishing Applying Migrations"
}

if (($migrations | Measure-Object).Count -eq 0) {
   Write-Output "No migrations found"
}
else {
   CheckContainerStatus
   ApplyMigration
}