$dir = 'src\DonateTo.Infrastructure\Data\Migrations'
$migrations = Get-ChildItem -Path $dir -Recurse -Filter *.cs
$contextDb = "DonateToDbContext"
$startUp = '.\src\DonateTo.WebApi\DonateTo.WebApi.csproj'

function ApplyMigration(){
   Write-Output "Start Applying Migrations"
   $lastMigration = Get-ChildItem -Path $dir -Exclude *ModelSnapshot.cs | Sort-Object LastAccessTime -Descending | Select-Object -First 1 
   Write-Output $lastMigration.name
   dotnet ef database update --startup-project  $startUp --context $contextDb --verbose 
   Write-Output "Finishing Applying Migrations"
}

if((docker inspect donateto_postgres).count -eq 1)
{
   Write-Output "Container does not Exist."
   Write-Output "Start PostgreDb Build."
   docker-compose up -d --build postgres_donateto
   Write-Output "Finishing PostgreDb Build."
}else
{
    Write-Output "Checking if PostgreDb is UP."
    if((docker inspect -f '{{.State.Running}}' donateto_postgres) -eq 'false' )
    {
       Write-Output "PostgreDb is DOWN."
       Write-Output "Starting Container."
       docker-compose up -d postgres_donateto
    }
}

Write-Output "Container UP."
Write-Output "Checking for Migrations"

if (($migrations | Measure-Object).Count -eq 0)
{
    Write-Output "No Migrations founded"
}
else{
   ApplyMigration
}