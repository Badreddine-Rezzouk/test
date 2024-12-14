import { Check, Delete } from '@mui/icons-material';
import {
  Box, Button, Container, IconButton, TextField, Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch.ts';
import { Task } from '../index';

const TodoPage = () => {
  const api = useFetch();
  const [ tasks, setTasks ] = useState<Task[]>([]);

  const handleFetchTasks = async () => setTasks(await api.get('/tasks'));

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/tasks/${id}`);
      await handleFetchTasks();
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  const handleSave = async (task: Task) => {
    try {
      const updatedTask = tasks.find((t) => t.id === task.id);

      if (updatedTask?.name === task.name) {
        console.log('Task name did not change. No update needed.');
        return;
      }

      await api.put(`/tasks/${task.id}`, { name: task.name });
      await handleFetchTasks();
    } catch (error) {
      console.error('Failed to save task:', error);
    }
  };

  const handleAddTask = async () => {
    try {
      await api.post('/tasks', { name: 'New Task' });
      await handleFetchTasks();
    } catch (error) {
      console.error('Failed to add task:', error);
    }
  };

  useEffect(() => {
    (async () => {
      handleFetchTasks();
    })();
  }, []);

  return (
    <Container>
      <Box display="flex" justifyContent="center" mt={5}>
        <Typography variant="h2">HDM Todo List</Typography>
      </Box>

      <Box justifyContent="center" mt={5} flexDirection="column">
        {tasks.map((task) => {
          const [ taskName, setTaskName ] = useState(task.name);

          const isNameChanged = taskName !== task.name;

          return (
            <Box
              key={task.id}
              display="flex"
              justifyContent="center"
              alignItems="center"
              mt={2}
              gap={1}
              width="100%"
            >
              <TextField
                size="small"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                fullWidth
                sx={{ maxWidth: 350 }}
              />
              <Box>
                <IconButton
                  color="success"
                  disabled={!isNameChanged}
                  onClick={() => handleSave({ ...task, name: taskName })}
                >
                  <Check />
                </IconButton>
                <IconButton color="error" onClick={() => handleDelete(task.id)}>
                  <Delete />
                </IconButton>
              </Box>
            </Box>
          );
        })}

        <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
          <Button variant="outlined" onClick={handleAddTask}>
            Ajouter une tâche
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default TodoPage;
