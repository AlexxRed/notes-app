import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

// ================== make modal ==================
export const deleteModal = basicLightbox.create(`
<div class="delete-modal">
	<h1>Do you really want to delete this task?</h1>
	<p id="text" class="modal-text">item</p>
<button class="btn btn-cancel btn-success">Cancel</button>
<button class="btn btn-delete btn-danger">Delete</button>
</div>
`);