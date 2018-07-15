import express from 'express';
import ctrl from './todo.ctrl';

const router = express.Router();

router.route('/todo')

    // GET /api/v1/todo - Get list of todos
    //.get(ctrl.getAll)
    
    .get(ctrl.getAll)

    // if get
    // .../todo/name
    // if gte given timestamp, response should be < than query time
    
    
    

    // POST /api/v1/todo - Create new todo
    .post(ctrl.create);
    
    // if post find one and update if does not exist
    
    // endpoint object (todo)
    // if body given
    


router.route('/todo/:id')

    // DELETE /api/v1/todo/:id - Delete todo
    .delete(ctrl.remove)

    // PUT /api/v1/todo/:id - Update todo
    .put(ctrl.update);

export default router;
