using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebStudentApi.Models;

namespace WebStudentApi.Controllers
{
    [ApiController]
    [Route("api/students")]
    public class ProductController : Controller
    {
        ApplicationContext db;
        public ProductController(ApplicationContext context)
        {
            db = context;
            if (!db.Students.Any())
            {
                db.Students.Add(new Student { FIO = "Орищин Юрій", Lesson = "Програмування", Point = 3 });
                db.SaveChanges();
            }
        }
        [HttpGet]
        public IEnumerable<Student> Get()
        {
            return db.Students.ToList();
        }

        [HttpGet("{id}")]
        public Student Get(int id)
        {
            Student student = db.Students.FirstOrDefault(x => x.Id == id);
            return student;
        }

        [HttpPost]
        public IActionResult Post(Student student)
        {
            if (ModelState.IsValid)
            {
                db.Students.Add(student);
                db.SaveChanges();
                return Ok(student);
            }
            return BadRequest(ModelState);
        }

        [HttpPut]
        public IActionResult Put(Student student)
        {
            if (ModelState.IsValid)
            {
                db.Update(student);
                db.SaveChanges();
                return Ok(student);
            }
            return BadRequest(ModelState);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            Student student = db.Students.FirstOrDefault(x => x.Id == id);
            if (student != null)
            {
                db.Students.Remove(student);
                db.SaveChanges();
            }
            return Ok(student);
        }
    }
}