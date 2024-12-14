NB: L'IA ChatGPT a été utilisé dans l'unique but de générer des commentaires

Ce test aura été ma première experience avec certains frameworks, et j'y ai rencontré plusieurs problèmes 
d'initialisation (notamment avec Prisma) m'ayant fait perdre plusieurs heures 

Modifications 

CreateTask et SaveTask (task.update) utilisent le même système d'insertion, avec la différence que CreateTask reçoit un 
paramètre id 'null'
TaskRepository utilise save pour mettre à jour la task ou la créer selon si un id est passé en paramètre
Dans ToDoPage.tsx, useEffect await le handleFetchTasks()

A l'écriture de ce README, le projet ne fonctionne pas. Lancer index.html donne une page blanche, je n'arrive pas à 
diagnostiquer ce comportement