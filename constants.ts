import { Lesson } from './types';

export const DB_SEED_SQL = `
  CREATE TABLE employees (
    id INTEGER PRIMARY KEY,
    name TEXT,
    department TEXT,
    salary INTEGER,
    hire_date TEXT
  );

  INSERT INTO employees (name, department, salary, hire_date) VALUES
  ('Alice Johnson', 'Engineering', 95000, '2021-03-15'),
  ('Bob Smith', 'Marketing', 65000, '2020-06-22'),
  ('Charlie Brown', 'Engineering', 88000, '2019-11-05'),
  ('Diana Ross', 'HR', 72000, '2022-01-10'),
  ('Evan Wright', 'Marketing', 62000, '2023-05-18'),
  ('Fiona Green', 'Engineering', 105000, '2018-09-30');

  CREATE TABLE projects (
    id INTEGER PRIMARY KEY,
    title TEXT,
    budget INTEGER,
    lead_id INTEGER,
    FOREIGN KEY(lead_id) REFERENCES employees(id)
  );

  INSERT INTO projects (title, budget, lead_id) VALUES
  ('Website Redesign', 5000, 2),
  ('Mobile App', 15000, 1),
  ('HR Portal', 8000, 4);
`;

export const LESSONS: Lesson[] = [
  {
    id: '1',
    title: 'Select Everything',
    description: 'Learn how to retrieve all data from a table.',
    instructions: 'Retrieve all columns from the `employees` table using the `SELECT *` syntax.',
    initialQuery: 'SELECT * FROM employees;',
    hint: 'Use the asterisk (*) wildcard to select all columns.',
    solution: 'SELECT * FROM employees;',
  },
  {
    id: '2',
    title: 'Specific Columns',
    description: 'Retrieve only the data you need.',
    instructions: 'Select only the `name` and `salary` of all employees.',
    initialQuery: 'SELECT ... FROM employees;',
    hint: 'List the column names separated by commas instead of using *.',
    solution: 'SELECT name, salary FROM employees;',
  },
  {
    id: '3',
    title: 'Filtering Data',
    description: 'Use the WHERE clause to filter results.',
    instructions: 'Find all employees who work in the \'Engineering\' department.',
    initialQuery: 'SELECT * FROM employees WHERE ...;',
    hint: 'Use `department = \'Engineering\'` in your WHERE clause.',
    solution: 'SELECT * FROM employees WHERE department = \'Engineering\';',
  },
  {
    id: '4',
    title: 'Sorting Results',
    description: 'Order your data meaningfully.',
    instructions: 'List all employees ordered by their `salary` in descending order (highest first).',
    initialQuery: 'SELECT * FROM employees ORDER BY ...;',
    hint: 'Use `ORDER BY salary DESC`.',
    solution: 'SELECT * FROM employees ORDER BY salary DESC;',
  },
  {
    id: '5',
    title: 'Aggregation',
    description: 'Calculate summary statistics.',
    instructions: 'Calculate the average salary of all employees. Name the column `avg_salary`.',
    initialQuery: 'SELECT ... FROM employees;',
    hint: 'Use the `AVG(column)` function.',
    solution: 'SELECT AVG(salary) as avg_salary FROM employees;',
  }
];
