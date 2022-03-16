// @ts-check

export default {
  translation: {
    appName: 'Менеджер задач',
    flash: {
      session: {
        create: {
          success: 'Вы залогинены',
          error: 'Неправильный емейл или пароль',
        },
        delete: {
          success: 'Вы разлогинены',
        },
      },
      users: {
        create: {
          error: 'Не удалось зарегистрировать',
          success: 'Пользователь успешно зарегистрирован',
        },
        edit: {
          error: 'Не удалось изменить данные пользователя',
          success: 'Данные пользователя успешно изменены',
        },
        delete: {
          error: 'Не удалось удалить пользователя',
          success: 'Пользователь успешно удален',
        },
      },
      statuses: {
        create: {
          error: 'Не удалось создать статус задачи',
          success: 'Статус задачи успешно создан',
        },
        edit: {
          error: 'Не удалось изменить статус задачи',
          success: 'Статус задачи успешно изменен',
        },
        delete: {
          error: 'Не удалось удалить статус задачи',
          success: 'Статус задачи успешно удален',
        },
      },
      authError: 'Доступ запрещён! Пожалуйста, авторизируйтесь.',
    },
    layouts: {
      application: {
        users: 'Пользователи',
        statuses: 'Статусы',
        signIn: 'Вход',
        signUp: 'Регистрация',
        signOut: 'Выход',
        sourceCode: 'Исходный код',
      },
    },
    views: {
      session: {
        new: {
          signIn: 'Вход',
          submit: 'Войти',
        },
      },
      users: {
        id: 'ID',
        firstName: 'Имя',
        lastName: 'Фамилия',
        fullName: 'Полное имя',
        email: 'Email',
        password: 'Пароль',
        createdAt: 'Дата создания',
        new: {
          submit: 'Сохранить',
          signUp: 'Регистрация',
        },
        edit: 'Изменить',
        delete: 'Удалить',
        settings: 'Настройки',
      },
      statuses: {
        id: 'ID',
        name: 'Название',
        header: 'Статусы задачи',
        new: {
          action: 'Создать статус задачи',
          header: 'Создание статуса задачи',
          submit: 'Сохранить',
        },
        edit: 'Изменить',
        delete: 'Удалить',
      },
      welcome: {
        index: {
          hello: 'Привет от Хекслета!',
          description: 'Практические курсы по программированию',
          more: 'Узнать Больше',
        },
      },
    },
  },
};
