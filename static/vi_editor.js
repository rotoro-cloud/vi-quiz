var questions = [
	{
		"title": "Insert Mode",
		"question": "Перейди в режим вставки - `Insert Mode`",
		"subText": "",
		"hint": "Нажми `i`",
		"test": {
			"type": "mode",
			"mode": 1
		},
		"stage_file": "welcome.txt"
	},
	{
		"title": "Command Mode",
		"question": "Выйди из режима вставки",
		"subText": "",
		"hint": "Нажми `ESC`",
		"test": {
			"type": "mode",
			"mode": 0
		}
	},
	{
		"title": "Delete",
		"question": "У нас здесь опечатка. Поправь на `It's Linux Time!`",
		"subText": "",
		"hint": "Двигай курсор по символам и нажимай `x` для удаления",
		"test": {
			"type": "text",
			"content": "It's Linux Time!"
		},
		"stage_file": "linux.txt"
	},
	{
		"title": "Edit",
		"question": "Измени содержимое файла на `Linux for Beginners` и `сохрани` файл.",
		"hint": "Перейди в `режим вставки`, нажав `i`, удали все содержимое и напиши нужное. Когда будешь готов нажми `ESC`, чтобы перейти в `командный режим`. В нем напиши команду `:w`",
		"subText": "",
		"test": {
			"type": "textsave",
			"content": "Linux for Beginners"
		}
	},
	{
		"title": "Edit Nginx",
		"question": "Здесь конфигурация веб-сервера Nginx. Обнови порт, чтобы он слушал на `80` вместо `30777`",
		"subText": "Ищи в 34 строке. Узнать номер строки, где в данный момент курсор можно введя в командном режиме `:.=`",
		"hint": "Перейди в режим вставки, нажав `i` и удали `30777`, а затем напиши `30777` в строке 34. Чтобы сразу попасть на строку 34, в командном режиме нажми `:`, а после введи `34` и `Enter`",
		"test": {
			"type": "file",
			"solution_file": "nginx-check2.conf"
		},
		"stage_file": "nginx.conf"
	},
	{
		"title": "Delete line",
		"question": "Удали строку, которая начинается с `tcp_nopush`. Удалить нужно строку полностью",
		"subText": "Строка 23",
		"hint": "Прейди в строку 23 (`:23`). Там нажми `dd` (дважды `d`) для удаления всей строки",
		"test": {
			"type": "file",
			"solution_file": "nginx-check3.conf"
		},
		"stage_file": "nginx-check2.conf"
	},
	{
		"title": "Undo",
		"question": "Нам нужно все вернуть как было с этой строкой. Сделай откат операции (`undo`).",
		"subText": "Строка 33",
		"hint": "Нажми `u` для отмены предыдущего действия",
		"test": {
			"type": "file",
			"solution_file": "nginx-check2.conf"
		}
	},
	{
		"title": "Find",
		"question": "Здесь где-то спряталась `]` - квадратная правая скобка. Нужно найти!",
		"subText": "Пожалуйста, не ищи глазами, используй Vi",
		"hint": "Используй команду поиска в Vi `/]`",
		"test": {
			"type": "cursor",
			"position": {x: 35, y: 25}
		},
		"stage_file": "brackets.txt"
	},
	{
		"title": "Copy and Paste",
		"question": "Я нарисовал картину для тебя. Но строки перемешались. Очень хорошо, что я их пронумеровал. Расставь строки в правильном порядке. Строки можно двигать вверх и вниз. Пожалуйста, не меняй содержимое строк.",
		"subText": "",
		"hint": "Выбери строку и полностью скопируй, нажав `yy`. После перемести курсор куда ты хочешь скопировать их и нажми `p`. После удали не нужную строку, перейдя на нее и использовав `dd`",
		"test": {
			"type": "file",
			"solution_file": "cheshire-check1.txt"
		},
		"stage_file": "cheshire.txt"
	},
	{
		"title": "That's All",
		"question": "У тебя все получилось",
		"subText": "",
		"hint": "",
		"test": {
			"type": "file",
			"solution_file": "bye.txt"
		},
		"stage_file": "bye.txt"
	}
]