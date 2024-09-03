using Microsoft.EntityFrameworkCore;
using stockz_bucketz_api.Context;
using stockz_bucketz_api.Context.Dao;
using stockz_bucketz_api.Interfaces;
using stockz_bucketz_api.Services;

var builder = WebApplication.CreateBuilder(args);

// Pode criar um enviromnetVariable e por sua string de conexão
string varName = "ConnStock";

//Ou passar sua connectionString aqui 
string connectionString = Environment.GetEnvironmentVariable(varName, EnvironmentVariableTarget.Machine);

builder.Services.AddDbContext<AppDbContext>(opts =>
{

    //caso for usar sqlServe usar opts.useSqlServer(connectionString); e não esquecer de adicionar e updar migration do banco de dados.
    opts.UseMySql(connectionString,ServerVersion.AutoDetect(connectionString));
});
builder.Services.AddHttpClient<ApiBrapiService>();


builder.Services.AddScoped<IStockDao, StockDao>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});


builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("AllowAll");

app.UseAuthorization();

app.MapControllers();

app.Run();
