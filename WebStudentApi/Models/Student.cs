using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebStudentApi.Models
{
    public class Student
    {
        public int Id { get; set; }
        public string FIO { get; set; }    
        public string Lesson { get; set; } 
        public int Point { get; set; } 
    }
}
