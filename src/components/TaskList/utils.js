export const getPriorityColor = (priority) => {
  switch (priority) {
    case 'high': return '#ff4757';
    case 'medium': return '#ffa502';
    case 'low': return '#2ed573';
    default: return '#747d8c';
  }
};

export const getPriorityIcon = (priority) => {
  switch (priority) {
    case 'high': return 'flag';
    case 'medium': return 'flag-outline';
    case 'low': return 'flag-outline';
    default: return 'flag-outline';
  }
};

export const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR');
};

export const isOverdue = (dueDate) => {
  if (!dueDate) return false;
  return new Date(dueDate) < new Date();
};

export const getDaysUntilDue = (dueDate) => {
  if (!dueDate) return Infinity;
  const today = new Date();
  const due = new Date(dueDate);
  const diffTime = due - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

export const getPriorityWeight = (priority) => {
  switch (priority) {
    case 'high': return 3;
    case 'medium': return 2;
    case 'low': return 1;
    default: return 0;
  }
};

export const sortTasks = (tasks) => {
  return [...tasks].sort((a, b) => {
    // Primeiro: tarefas não completadas vêm antes das completadas
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }

    // Se ambas estão completadas, ordem alfabética
    if (a.completed && b.completed) {
      return a.title.localeCompare(b.title);
    }

    // Para tarefas não completadas:
    const aOverdue = isOverdue(a.dueDate);
    const bOverdue = isOverdue(b.dueDate);

    // Tarefas vencidas vêm primeiro
    if (aOverdue !== bOverdue) {
      return aOverdue ? -1 : 1;
    }

    // Se ambas estão vencidas ou ambas não estão vencidas
    if (aOverdue && bOverdue) {
      // Ambas vencidas: ordenar por dias de atraso (mais atrasada primeiro)
      const aDaysOverdue = Math.abs(getDaysUntilDue(a.dueDate));
      const bDaysOverdue = Math.abs(getDaysUntilDue(b.dueDate));
      
      if (aDaysOverdue !== bDaysOverdue) {
        return bDaysOverdue - aDaysOverdue; // Mais atrasada primeiro
      }
      
      // Mesmo número de dias de atraso: ordenar por prioridade
      const aPriority = getPriorityWeight(a.priority);
      const bPriority = getPriorityWeight(b.priority);
      return bPriority - aPriority; // Prioridade alta primeiro
    }

    // Ambas não vencidas: ordenar por proximidade da data
    const aDaysUntilDue = getDaysUntilDue(a.dueDate);
    const bDaysUntilDue = getDaysUntilDue(b.dueDate);

    if (aDaysUntilDue !== bDaysUntilDue) {
      return aDaysUntilDue - bDaysUntilDue; // Mais próxima primeiro
    }

    // Mesma data: ordenar por prioridade
    const aPriority = getPriorityWeight(a.priority);
    const bPriority = getPriorityWeight(b.priority);
    return bPriority - aPriority; // Prioridade alta primeiro
  });
}; 