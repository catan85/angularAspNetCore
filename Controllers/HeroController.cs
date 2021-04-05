using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace angularAspNetCore.Controllers
{
    // Controller mappa su Hero (il suffisso è escluso automaticamente)
    [Route("api/[controller]")]
    public class HeroController : Controller
    {
        private static Hero[] HEROES = new Hero[]
        {
            new Hero { Id = 1, Name = "Andrea"},
            new Hero { Id = 11, Name = "Dr Niceee"},
            new Hero { Id = 12, Name = "Narco"},
            new Hero { Id = 13, Name = "Bombasto"},
            new Hero { Id = 14, Name = "Celeritas"},
            new Hero { Id = 15, Name = "Magneta"},
            new Hero { Id = 16, Name = "RubberMan"},
            new Hero { Id = 17, Name = "Dynamo"},
            new Hero { Id = 18, Name = "Dr IQ"},
            new Hero { Id = 19, Name = "Magma"},
            new Hero { Id = 20, Name = "Tornado"}
        };

        // La get senza argomenti prende direttamente la route del controller /api/hero
        [HttpGet]
        public IEnumerable<Hero> HeroesList()
        {
            return HEROES;
        }

        // La get con stringa fissa aggiunge in fondo alla route del controller /api/hero/random
        [HttpGet("random")]
        public Hero GetRandomHero()
        {
            Random r = new Random(DateTime.Now.Millisecond);
            int index = Convert.ToInt32(Math.Floor(HEROES.Length * r.NextDouble()));
            return HEROES[index];
        }

        // La get con id aggiunge in fondo alla route del controller /api/hero/{id}
        [HttpGet("{id}")]
        public Hero GetHero(int id)
        {
            return HEROES.Where(h => h.Id == id).FirstOrDefault();
        }


    }
}
