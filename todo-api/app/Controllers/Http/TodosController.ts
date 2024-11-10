import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Todo from 'App/Models/Todo';

export default class TodosController {
  public async index({ response }: HttpContextContract) {
    const todos = await Todo.all();
    return response.json(todos);
  }

  public async store({ request, response }: HttpContextContract) {
    const data = request.only(['text', 'completed']);
    const todo = await Todo.create(data);
    return response.json(todo);
  }

  public async update({ params, request, response }: HttpContextContract) {
    try {
      const todo = await Todo.findOrFail(params.id);
      const completed = request.input('completed');
      
      if (typeof completed !== 'undefined') {
        todo.completed = completed;
        await todo.save();
        return response.json(todo);
      } else {
        return response.status(400).json({ message: 'Invalid data for updating todo' });
      }
    } catch (error) {
      return response.status(500).json({ message: 'Error updating todo', error });
    }
  }

  // ฟังก์ชันสำหรับสลับสถานะ completed
  public async toggle({ params, response }: HttpContextContract) {
    try {
      const todo = await Todo.findOrFail(params.id);
      
      // สลับค่าของ completed
      todo.completed = !todo.completed;
      await todo.save();

      return response.json(todo);
    } catch (error) {
      return response.status(500).json({ message: 'Error toggling todo', error });
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    const todo = await Todo.findOrFail(params.id);
    await todo.delete();
    return response.status(204);
  }
}
