using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace AngularApplication.Models
{
    public class Todo
    {
        public Todo()
        {
        
        }

        public Todo(string title, string description, string date, string tags, string state, string owner)
        {
            this.title = title;
            this.description = description;
            this.date = date;
            this.tags = tags;
            this.state = state;
            this.Owner = owner;
        }

        public int ID { get; set; }
        public string title { get; set; }
        public string description { get; set; }
        public string date { get; set; }

        public string tags { get; set; }
        public string state { get; set; }
        public string Owner { get; set; }
    }
}
