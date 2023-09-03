const fs=require('fs');
const path = require('path');
const util=require('util');
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

class Db{
        uuid(){
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
      };

        write(note) {
        return writeFile('db/db.json', JSON.stringify(note));
    }
        read(){
            return readFile('db/db.json','utf-8');
        }
        getNotes(){
            return this.read().then(notes=>{
                let parsedNotes;

                try{
                    parsedNotes=[].concat(JSON.parse(notes))
                }catch(err){
                    parsedNotes=[];
                }
                return parsedNotes;
            })
        }
        addNote(data) {
            const { title, text } = data;
        
            if (!title || !text) {
              throw new Error("Note 'title' and 'text' cannot be blank");
            }
    
            const newNote = { title, text, id: this.uuid() };
                    return this.getNotes()
              .then((notes) => [...notes, newNote])
              .then((updatedNotes) => this.write(updatedNotes))
              .then(() => newNote);
          }
        
          removeNote(id) {
            return this.getNotes()
              .then((notes) => notes.filter((note) => note.id !== id))
              .then((filteredNotes) => this.write(filteredNotes));
          }

}


module.exports=new Db();


  