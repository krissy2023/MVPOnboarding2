using Microsoft.EntityFrameworkCore;
using MVPOnboarding2.Server.Models;

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
var url = "mvponboarding2.azurewebsites.net";
//var url = "https://localhost:5173";
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<OnboardingTaskContext>(options => options.UseSqlServer(
    builder.Configuration.GetConnectionString("ProdConnection")));

builder.Services.AddCors(options =>
{
	options.AddPolicy(name: MyAllowSpecificOrigins,
					  policy =>
					  {
						  policy.WithOrigins(url
											  ).AllowAnyHeader()
											   .AllowAnyMethod();
					  });
});

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(MyAllowSpecificOrigins);

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
