import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

export function editNoteForm({ id, name,  category, dates, content }) {

const editForm = basicLightbox.create(`
<div class="create-notes-modal">
	<h1 class="create-notes-text">Edit Your Note</h1>
<form class="create-notes-form">
    <p class="create-notes-text">Category</p>
    <input required type="radio" id="task" name="category" value="Task" checked>
    <label class="create-notes-text" for="task">Task</label>
    <input required type="radio" id="randomthought" name="category" value="Random Thought">
    <label class="create-notes-text" for="randomthought">Random Thought</label>
    <input required type="radio" id="idea" name="category" value="Idea">
    <label class="create-notes-text" for="idea">Idea</label><br>
    <label class="create-notes-text" for="name">Name</label><br>
    <input required type="text" id="name" name="name" value=${name} ><br>
    <label class="create-notes-text" for="content" Description</label><br>
    <textarea required type="textarea" id="content" name="content" rows="4" cols="50">${content}</textarea><br>
    <label class="create-notes-text date-modal" for="dates">Next Date</label><br>
    <input type="date" id="dates" name="dates"
    value=${dates}
    required
    min="2022-01-01" max="2050-12-31"><br>
    <button type="submit" class="btn btn-cancel btn-success">Change</button>
    <button type="button" class="btn btn-delete btn-danger cancel-create">Cancel</button>
</form>
</div>
`);
    
return editForm
}

    // <label class="create-notes-text date-modal" for="dates">Created</label><br>
    // <input type="date" id="dates" name="dates"
    // value=${created}
    // min="2022-09-13" max="2050-12-31"><br></br>
