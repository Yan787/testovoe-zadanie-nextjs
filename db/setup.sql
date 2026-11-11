BEGIN;

CREATE TABLE IF NOT EXISTS problems (
  slug text PRIMARY KEY,
  title text NOT NULL,
  topic text NOT NULL,
  difficulty text NOT NULL,
  question text NOT NULL,
  answer text NOT NULL
);

INSERT INTO problems (slug, title, topic, difficulty, question, answer)
VALUES
  (
    'react-use-ref',
    'Для чего нужен useRef в React?',
    'React',
    'Базовый',
    'Какую задачу решает useRef в React? Что происходит при изменении ref.current?',
    'useRef возвращает один и тот же объект между рендерами. В его свойстве current можно хранить ссылку на DOM-элемент, идентификатор таймера или другое значение, которое нужно сохранить между рендерами. Изменение current не запускает новый рендер. Для данных, от которых зависит интерфейс, используйте состояние.'
  ),
  (
    'javascript-closures',
    'Как работают замыкания?',
    'JavaScript',
    'Средний',
    'Почему функция сохраняет доступ к переменным внешней функции после завершения её вызова?',
    'Функция сохраняет доступ к лексическому окружению, в котором была создана. Например, если внешняя функция создаёт переменную count и возвращает функцию, увеличивающую count, каждый вызов возвращённой функции продолжит работать с этой переменной. Новый вызов внешней функции создаст отдельную переменную count.'
  ),
  (
    'css-box-sizing',
    'Что меняет box-sizing?',
    'CSS',
    'Базовый',
    'Как box-sizing влияет на ширину элемента с заданными width, padding и border?',
    'При content-box свойство width задаёт ширину области содержимого. Padding и border добавляются сверху. При border-box они входят в заданную ширину. Например, при width: 200px, padding: 10px и border: 2px общая ширина будет 224px для content-box и 200px для border-box.'
  )
ON CONFLICT (slug) DO NOTHING;

COMMIT;
