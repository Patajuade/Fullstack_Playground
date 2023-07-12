using API_test.Models;
using API_test.Persistence;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


// Add services to the container.
builder.Services.AddDbContext<DataContext>(options => options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();


//Ajouter des infos à la db locale
//using (var scope = app.Services.CreateScope())
//{
//    var services = scope.ServiceProvider;
//    var context = services.GetRequiredService<DataContext>();

//    var character1 = new Character
//    {
//        Name = "Patajuade",
//        Class = "Druid",
//        DateOfCreation = DateTime.Now,
//        Spec = "Restauration"
//    };

//    var character2 = new Character
//    {
//        Name = "Pomdapis",
//        Class = "Monk",
//        DateOfCreation = DateTime.Now,
//        Spec = "Windwlaker"
//    };

//    var character3 = new Character
//    {
//        Name = "Pompeii",
//        Class = "Shaman",
//        DateOfCreation = DateTime.Now,
//        Spec = "Enhancement"
//    };

//    var character4 = new Character
//    {
//        Name = "Pataves",
//        Class = "Evoker",
//        DateOfCreation = DateTime.Now,
//        Spec = "Preservation"
//    };

//    context.Character.Add(character1);
//    context.Character.Add(character2);
//    context.Character.Add(character3);
//    context.Character.Add(character4);

//    context.SaveChanges();
//}


app.Run();
