export const nodes = {
  start: {
    title: 'Start',
    icon: 'lightning-bolt',
    input: 0,
    output: 1,
    allowedInput: ['chat', 'annotation'],
    maxConnection: 1,
    colorGradient: 'from-yellow-400 to-orange-500',
    textColor: 'text-yellow-500',
  },
  chat: {
    title: 'Chats',
    icon: 'chat-alt2',
    input: 1,
    output: 1,
    allowedInput: ['option', 'end', 'annotation'],
    maxConnection: 1,
    colorGradient: 'from-green-400 to-cyan-500',
    textColor: 'text-primary',
    data: {
      chats: [],
    },
  },
  transition: {
    title: 'Transition',
    icon: 'location-marker',
    input: 1,
    output: 1,
    allowedInput: [],
    colorGradient: 'from-light-blue-400 to-indigo-500',
    textColor: 'text-cyan-500',
    maxConnection: 1,
    data: {
      text: '',
    },
  },
  annotation: {
    title: 'Annotation',
    icon: 'annotation',
    input: 1,
    output: 1,
    allowedInput: ['chat', 'option'],
    colorGradient: 'from-light-blue-400 to-indigo-500',
    textColor: 'text-cyan-500',
    maxConnection: 1,
    data: {
      text: '',
    },
  },
  option: {
    title: 'Options',
    icon: 'clipboard-list',
    input: 1,
    output: 1,
    allowedInput: ['chat', 'annotation', 'end'],
    colorGradient: 'from-light-blue-400 to-indigo-500',
    textColor: 'text-green-500',
    maxConnection: 1,
    data: {
      options: [''],
    },
  },
  end: {
    title: 'Ending',
    icon: 'flag',
    input: 1,
    output: 0,
    allowedInput: [],
    maxConnection: 0,
    colorGradient: 'from-purple-500 to-indigo-500',
    textColor: 'text-purple-500',
  },
};

export const nodesData = [
  {
    $id: '97925512-fdfe-427a-a36a-092b22ae3b80',
    id: '97925512-fdfe-427a-a36a-092b22ae3b80',
    type: 'start',
    storyId: 'test',
    data: null,
    outputs: {
      output_1: {
        connections: [
          {
            node: '974d566e-e788-43c3-808a-4f82b98dbb14',
            output: 'input_1',
          },
        ],
      },
    },
    inputs: {},
    pos_x: 94,
    pos_y: 176,
  },
  {
    $id: '974d566e-e788-43c3-808a-4f82b98dbb14',
    id: '974d566e-e788-43c3-808a-4f82b98dbb14',
    type: 'annotation',
    storyId: 'test',
    data: {
      text: 'One day...',
    },
    outputs: {
      output_1: {
        connections: [
          {
            node: '14f6992c-dc4c-4dc7-90a5-a68a198ed9c0',
            output: 'input_1',
          },
        ],
      },
    },
    inputs: {
      input_1: {
        connections: [
          {
            node: '97925512-fdfe-427a-a36a-092b22ae3b80',
            input: 'output_1',
          },
        ],
      },
    },
    pos_x: 329,
    pos_y: 163.33333333333334,
  },
  {
    $id: '14f6992c-dc4c-4dc7-90a5-a68a198ed9c0',
    id: '14f6992c-dc4c-4dc7-90a5-a68a198ed9c0',
    type: 'chat',
    storyId: 'test',
    data: {
      chats: [
        {
          id: '6pJR9P0132AQysCvA9kQL',
          characterId: '1yssPZWt2u59Hag2j6iIP',
          imageUrl: '',
          message: 'When...',
        },
        {
          id: 'a8my1Qe-Fx66YjZgPeHXD',
          characterId: '1yssPZWt2u59Hag2j6iIP',
          imageUrl: '',
          message: 'I walk, when I walk',
        },
        {
          id: 'byK-sKmJgaJ5u7OCCgHOg',
          characterId: '1yssPZWt2u59Hag2j6iIP',
          imageUrl: '',
          message: 'When I walk my hore upon a hill',
        },
        {
          id: 'O9Wyq-NqM-XbPJaPkGBVC',
          characterId: 'MHAC5I8Vvnp7UMIYMyucL',
          imageUrl: '',
          message: 'Dogs is here',
        },
      ],
    },
    outputs: {
      output_1: {
        connections: [
          {
            node: '19ef7f8c-228b-4cf4-8034-72a750c6d2f9',
            output: 'input_1',
          },
        ],
      },
    },
    inputs: {
      input_1: {
        connections: [
          {
            node: '974d566e-e788-43c3-808a-4f82b98dbb14',
            input: 'output_1',
          },
        ],
      },
    },
    pos_x: 661.3333333333334,
    pos_y: 66,
  },
  {
    $id: '19ef7f8c-228b-4cf4-8034-72a750c6d2f9',
    id: '19ef7f8c-228b-4cf4-8034-72a750c6d2f9',
    type: 'option',
    storyId: 'test',
    data: {
      options: ['When I thought she', 'Dear boy'],
    },
    outputs: {
      output_1: {
        connections: [
          {
            node: '12fe9775-a508-4846-8332-6a6b5105d548',
            output: 'input_1',
          },
        ],
      },
      output_2: {
        connections: [
          {
            node: '781ebd4b-8ff8-4bf0-80c5-72295623ab7b',
            output: 'input_1',
          },
        ],
      },
    },
    inputs: {
      input_1: {
        connections: [
          {
            node: '14f6992c-dc4c-4dc7-90a5-a68a198ed9c0',
            input: 'output_1',
          },
        ],
      },
    },
    pos_x: 956,
    pos_y: 101.33333333333333,
  },
  {
    $id: '12fe9775-a508-4846-8332-6a6b5105d548',
    id: '12fe9775-a508-4846-8332-6a6b5105d548',
    type: 'chat',
    storyId: 'test',
    data: {
      chats: [
        {
          id: '0-0SMe8auox9AOzb9lHWx',
          characterId: '1yssPZWt2u59Hag2j6iIP',
          imageUrl: '',
          message: 'Dog is here',
        },
        {
          id: 'Ooh0mKjKEX6t51b5e4Xjv',
          characterId: 'MHAC5I8Vvnp7UMIYMyucL',
          imageUrl: '',
          message: 'Dog is there',
        },
      ],
    },
    outputs: {
      output_1: {
        connections: [
          {
            node: '82d2b524-3e34-4a42-8c18-2ae099427834',
            output: 'input_1',
          },
        ],
      },
    },
    inputs: {
      input_1: {
        connections: [
          {
            node: '19ef7f8c-228b-4cf4-8034-72a750c6d2f9',
            input: 'output_1',
          },
        ],
      },
    },
    pos_x: 1286,
    pos_y: -108.66666666666667,
  },
  {
    $id: '781ebd4b-8ff8-4bf0-80c5-72295623ab7b',
    id: '781ebd4b-8ff8-4bf0-80c5-72295623ab7b',
    type: 'chat',
    storyId: 'test',
    data: {
      chats: [
        {
          id: 'r1Qj57XUV2Zrp2PqSyB26',
          characterId: '1yssPZWt2u59Hag2j6iIP',
          imageUrl: '',
          message: 'I guess you never know, dear boy',
        },
        {
          id: 'UQzNhiNss6OIWQfpRtXWs',
          characterId: '1yssPZWt2u59Hag2j6iIP',
          imageUrl: '',
          message: "I guess you never knew, what you've found",
        },
        {
          id: 'nYmvjyN6dGRjblL1xSZAL',
          characterId: '1yssPZWt2u59Hag2j6iIP',
          imageUrl: '',
          message: 'When I standing',
        },
      ],
    },
    outputs: {
      output_1: {
        connections: [
          {
            node: '382bda00-b06b-4d79-8b5b-8441ca7f7702',
            output: 'input_1',
          },
        ],
      },
    },
    inputs: {
      input_1: {
        connections: [
          {
            node: '19ef7f8c-228b-4cf4-8034-72a750c6d2f9',
            input: 'output_2',
          },
        ],
      },
    },
    pos_x: 1283.3333333333333,
    pos_y: 229,
  },
  {
    $id: '82d2b524-3e34-4a42-8c18-2ae099427834',
    id: '82d2b524-3e34-4a42-8c18-2ae099427834',
    type: 'option',
    storyId: 'test',
    data: {
      options: ['Monkberry moon delight', 'Speed along the highway'],
    },
    outputs: {
      output_1: {
        connections: [
          {
            node: 'a24da713-ac2c-43ee-bad7-8206bef28b4e',
            output: 'input_1',
          },
        ],
      },
      output_2: {
        connections: [
          {
            node: '4fc00ae8-6b44-47a6-8d8d-609da4817b47',
            output: 'input_1',
          },
        ],
      },
    },
    inputs: {
      input_1: {
        connections: [
          {
            node: '12fe9775-a508-4846-8332-6a6b5105d548',
            input: 'output_1',
          },
        ],
      },
    },
    pos_x: 1557,
    pos_y: -69.33333333333333,
  },
  {
    $id: '382bda00-b06b-4d79-8b5b-8441ca7f7702',
    id: '382bda00-b06b-4d79-8b5b-8441ca7f7702',
    type: 'option',
    storyId: 'test',
    data: {
      options: ['What is it?', 'Suck it...'],
    },
    outputs: {
      output_1: {
        connections: [
          {
            node: 'a084da6a-e9ee-4658-89f6-ce07c138e66a',
            output: 'input_1',
          },
        ],
      },
      output_2: {
        connections: [
          {
            node: '7eab77c2-e0e4-4fe8-8307-88969759be79',
            output: 'input_1',
          },
        ],
      },
    },
    inputs: {
      input_1: {
        connections: [
          {
            node: '781ebd4b-8ff8-4bf0-80c5-72295623ab7b',
            input: 'output_1',
          },
        ],
      },
    },
    pos_x: 1590,
    pos_y: 395.5,
  },
  {
    $id: '4fc00ae8-6b44-47a6-8d8d-609da4817b47',
    id: '4fc00ae8-6b44-47a6-8d8d-609da4817b47',
    type: 'chat',
    storyId: 'test',
    data: {
      chats: [
        {
          id: 'rgP3K3R7SvlicmRPXV-dy',
          characterId: '1yssPZWt2u59Hag2j6iIP',
          imageUrl: '',
          message: 'We just busy hiding, sitting in the back seat of my car',
        },
        {
          id: 'TvaoQbaNIwZwx6oWo1yPE',
          characterId: '1yssPZWt2u59Hag2j6iIP',
          imageUrl: '',
          message: 'Whe may end up in the mexico  city',
        },
      ],
    },
    outputs: {
      output_1: {
        connections: [
          {
            node: '714d7c14-da89-47cf-8ff1-576f31169362',
            output: 'input_1',
          },
        ],
      },
    },
    inputs: {
      input_1: {
        connections: [
          {
            node: '82d2b524-3e34-4a42-8c18-2ae099427834',
            input: 'output_2',
          },
        ],
      },
    },
    pos_x: 1880.3333333333333,
    pos_y: 11,
  },
  {
    $id: 'a24da713-ac2c-43ee-bad7-8206bef28b4e',
    id: 'a24da713-ac2c-43ee-bad7-8206bef28b4e',
    type: 'chat',
    storyId: 'test',
    data: {
      chats: [
        {
          id: '-xlzblrhMCrwVFzSegc-a',
          characterId: '1yssPZWt2u59Hag2j6iIP',
          imageUrl: 'https://picsum.photos/500',
          message: 'Tututut',
        },
      ],
    },
    outputs: {
      output_1: {
        connections: [
          {
            node: '3f4fae53-6296-4b54-aa9b-e7298c860a40',
            output: 'input_1',
          },
        ],
      },
    },
    inputs: {
      input_1: {
        connections: [
          {
            node: '82d2b524-3e34-4a42-8c18-2ae099427834',
            input: 'output_1',
          },
        ],
      },
    },
    pos_x: 1908,
    pos_y: -420.6666666666667,
  },
  {
    $id: 'a084da6a-e9ee-4658-89f6-ce07c138e66a',
    id: 'a084da6a-e9ee-4658-89f6-ce07c138e66a',
    type: 'chat',
    storyId: 'test',
    data: {
      chats: [
        {
          id: '2kbbBf2iR_j1DbqADZ_1y',
          characterId: 'MHAC5I8Vvnp7UMIYMyucL',
          imageUrl: '',
          message: 'We belive that we can...',
        },
        {
          id: 'XYG21DBnHTTEYoJ6-tfPL',
          characterId: 'MHAC5I8Vvnp7UMIYMyucL',
          imageUrl: 'https://picsum.photos/600',
          message: '',
        },
      ],
    },
    outputs: {
      output_1: {
        connections: [
          {
            node: '956f71c1-a560-423d-9d8c-2c929c538cb6',
            output: 'input_1',
          },
        ],
      },
    },
    inputs: {
      input_1: {
        connections: [
          {
            node: '382bda00-b06b-4d79-8b5b-8441ca7f7702',
            input: 'output_1',
          },
        ],
      },
    },
    pos_x: 1892.5,
    pos_y: 366,
  },
  {
    $id: '7eab77c2-e0e4-4fe8-8307-88969759be79',
    id: '7eab77c2-e0e4-4fe8-8307-88969759be79',
    type: 'chat',
    storyId: 'test',
    data: {
      chats: [
        {
          id: 'J4YRzdrehMtneFZNjnb7Z',
          characterId: '1yssPZWt2u59Hag2j6iIP',
          imageUrl: '',
          message: 'Huuu....',
        },
        {
          id: '6t8OJQAaO8xoyQYvM1lkF',
          characterId: '1yssPZWt2u59Hag2j6iIP',
          imageUrl: '',
          message: 'A....',
        },
        {
          id: 'Jz55P-qeyY5A92xP0ha3B',
          characterId: '1yssPZWt2u59Hag2j6iIP',
          imageUrl: '',
          message: 'hahahahah',
        },
      ],
    },
    outputs: {
      output_1: {
        connections: [
          {
            node: '21a87643-76de-4fed-8833-7734fa771d9c',
            output: 'input_1',
          },
        ],
      },
    },
    inputs: {
      input_1: {
        connections: [
          {
            node: '382bda00-b06b-4d79-8b5b-8441ca7f7702',
            input: 'output_2',
          },
        ],
      },
    },
    pos_x: 1912.5,
    pos_y: 852.5,
  },
  {
    $id: '21a87643-76de-4fed-8833-7734fa771d9c',
    id: '21a87643-76de-4fed-8833-7734fa771d9c',
    type: 'annotation',
    storyId: 'test',
    data: {
      text: 'The end...',
    },
    outputs: {
      output_1: {
        connections: [
          {
            node: 'e5be58ef-ea42-4143-a4b0-f802af6bf0ba',
            output: 'input_1',
          },
        ],
      },
    },
    inputs: {
      input_1: {
        connections: [
          {
            node: '7eab77c2-e0e4-4fe8-8307-88969759be79',
            input: 'output_1',
          },
        ],
      },
    },
    pos_x: 2193.5,
    pos_y: 941,
  },
  {
    $id: '04df5195-eb34-4af5-b787-ffb52632b0ee',
    id: '04df5195-eb34-4af5-b787-ffb52632b0ee',
    type: 'end',
    storyId: 'test',
    data: null,
    outputs: {},
    inputs: {
      input_1: {
        connections: [
          {
            node: 'e5be58ef-ea42-4143-a4b0-f802af6bf0ba',
            input: 'output_1',
          },
        ],
      },
    },
    pos_x: 2822,
    pos_y: 956.5,
  },
  {
    $id: 'e5be58ef-ea42-4143-a4b0-f802af6bf0ba',
    id: 'e5be58ef-ea42-4143-a4b0-f802af6bf0ba',
    type: 'chat',
    storyId: 'test',
    data: {
      chats: [
        {
          id: 'm-dQlBRqsMb6cec_KCBgf',
          characterId: '1yssPZWt2u59Hag2j6iIP',
          imageUrl: '',
          message: 'Wait, what!?',
        },
      ],
    },
    outputs: {
      output_1: {
        connections: [
          {
            node: '04df5195-eb34-4af5-b787-ffb52632b0ee',
            output: 'input_1',
          },
        ],
      },
    },
    inputs: {
      input_1: {
        connections: [
          {
            node: '21a87643-76de-4fed-8833-7734fa771d9c',
            input: 'output_1',
          },
          {
            node: '956f71c1-a560-423d-9d8c-2c929c538cb6',
            input: 'output_2',
          },
        ],
      },
    },
    pos_x: 2514,
    pos_y: 891.5,
  },
  {
    $id: '956f71c1-a560-423d-9d8c-2c929c538cb6',
    id: '956f71c1-a560-423d-9d8c-2c929c538cb6',
    type: 'option',
    storyId: 'test',
    data: {
      options: ['Well, well, well', 'Or this the only thing that you want me for?'],
    },
    outputs: {
      output_1: {
        connections: [
          {
            node: '6ace8cde-0fec-478c-8ac1-b25777cd6218',
            output: 'input_1',
          },
        ],
      },
      output_2: {
        connections: [
          {
            node: 'e5be58ef-ea42-4143-a4b0-f802af6bf0ba',
            output: 'input_1',
          },
        ],
      },
    },
    inputs: {
      input_1: {
        connections: [
          {
            node: 'a084da6a-e9ee-4658-89f6-ce07c138e66a',
            input: 'output_1',
          },
          {
            node: '7d75cb9d-98e0-43f2-b86e-1d3edc94a342',
            input: 'output_1',
          },
        ],
      },
    },
    pos_x: 2198.5,
    pos_y: 484,
  },
  {
    $id: '6ace8cde-0fec-478c-8ac1-b25777cd6218',
    id: '6ace8cde-0fec-478c-8ac1-b25777cd6218',
    type: 'annotation',
    storyId: 'test',
    data: {
      text: 'Then...',
    },
    outputs: {
      output_1: {
        connections: [
          {
            node: '9c083fc1-4f52-489d-b8fd-9c3be966a384',
            output: 'input_1',
          },
        ],
      },
    },
    inputs: {
      input_1: {
        connections: [
          {
            node: '956f71c1-a560-423d-9d8c-2c929c538cb6',
            input: 'output_1',
          },
        ],
      },
    },
    pos_x: 2493,
    pos_y: 503.5,
  },
  {
    $id: '9c083fc1-4f52-489d-b8fd-9c3be966a384',
    id: '9c083fc1-4f52-489d-b8fd-9c3be966a384',
    type: 'chat',
    storyId: 'test',
    data: {
      chats: [
        {
          id: 'VMdhUSJV5m0fBjYTTkhjl',
          characterId: '1yssPZWt2u59Hag2j6iIP',
          imageUrl: '',
          message: 'Long haired lady',
        },
        {
          id: '1zUozLGjTzIiYFBExSI44',
          characterId: '1yssPZWt2u59Hag2j6iIP',
          imageUrl: '',
          message: "Who's the favorite person, dear long haired lady",
        },
        {
          id: 'bZ3H6Yfps-9ozkD7eeIeC',
          characterId: 'MHAC5I8Vvnp7UMIYMyucL',
          imageUrl: '',
          message: "I'm belong to the girl with the flashing eye",
        },
      ],
    },
    outputs: {
      output_1: {
        connections: [
          {
            node: 'a2e91d1d-5fdb-4b7f-8432-f7f0f8cf3176',
            output: 'input_1',
          },
        ],
      },
    },
    inputs: {
      input_1: {
        connections: [
          {
            node: '6ace8cde-0fec-478c-8ac1-b25777cd6218',
            input: 'output_1',
          },
        ],
      },
    },
    pos_x: 2814.5,
    pos_y: 389,
  },
  {
    $id: 'a2e91d1d-5fdb-4b7f-8432-f7f0f8cf3176',
    id: 'a2e91d1d-5fdb-4b7f-8432-f7f0f8cf3176',
    type: 'option',
    storyId: 'test',
    data: {
      options: ['Sing your song', 'Good bye'],
    },
    outputs: {
      output_1: {
        connections: [
          {
            node: '1346d8c7-7000-48d8-8010-46e036c3ac1c',
            output: 'input_1',
          },
        ],
      },
      output_2: {
        connections: [
          {
            node: 'b5d55182-e55a-418d-81f1-320c8b4f231d',
            output: 'input_1',
          },
        ],
      },
    },
    inputs: {
      input_1: {
        connections: [
          {
            node: '9c083fc1-4f52-489d-b8fd-9c3be966a384',
            input: 'output_1',
          },
          {
            node: '3f1e8359-806e-4570-88e5-ed9a29997caa',
            input: 'output_1',
          },
          {
            node: '843b0ad5-074a-4221-bc9f-e5a7a826a870',
            input: 'output_1',
          },
        ],
      },
    },
    pos_x: 3123.5,
    pos_y: 449,
  },
  {
    $id: 'f6225130-550d-44b3-8f1a-ce7c3508e00a',
    id: 'f6225130-550d-44b3-8f1a-ce7c3508e00a',
    type: 'end',
    storyId: 'test',
    data: null,
    outputs: {},
    inputs: {
      input_1: {
        connections: [
          {
            node: 'b5d55182-e55a-418d-81f1-320c8b4f231d',
            input: 'output_1',
          },
          {
            node: '1346d8c7-7000-48d8-8010-46e036c3ac1c',
            input: 'output_1',
          },
        ],
      },
    },
    pos_x: 3490.5,
    pos_y: 940,
  },
  {
    $id: 'b5d55182-e55a-418d-81f1-320c8b4f231d',
    id: 'b5d55182-e55a-418d-81f1-320c8b4f231d',
    type: 'chat',
    storyId: 'test',
    data: {
      chats: [
        {
          id: 'MlwXpIvOSijhDyZo2zn1A',
          characterId: '1yssPZWt2u59Hag2j6iIP',
          imageUrl: '',
          message: 'Wel...',
        },
      ],
    },
    outputs: {
      output_1: {
        connections: [
          {
            node: 'f6225130-550d-44b3-8f1a-ce7c3508e00a',
            output: 'input_1',
          },
        ],
      },
    },
    inputs: {
      input_1: {
        connections: [
          {
            node: 'a2e91d1d-5fdb-4b7f-8432-f7f0f8cf3176',
            input: 'output_2',
          },
        ],
      },
    },
    pos_x: 3181,
    pos_y: 875.5,
  },
  {
    $id: '1346d8c7-7000-48d8-8010-46e036c3ac1c',
    id: '1346d8c7-7000-48d8-8010-46e036c3ac1c',
    type: 'chat',
    storyId: 'test',
    data: {
      chats: [
        {
          id: 'TNiNdNkOAELukzfM7c8Qo',
          characterId: '1yssPZWt2u59Hag2j6iIP',
          imageUrl: '',
          message: 'What song?',
        },
        {
          id: '-ZwcGP-MBcSkxjMhxobW3',
          characterId: '1yssPZWt2u59Hag2j6iIP',
          imageUrl: '',
          message: 'Love is long',
        },
        {
          id: 'ifNkWhipAGLsZSClgCE30',
          characterId: 'MHAC5I8Vvnp7UMIYMyucL',
          imageUrl: '',
          message: "When you're wrong",
        },
      ],
    },
    outputs: {
      output_1: {
        connections: [
          {
            node: 'f6225130-550d-44b3-8f1a-ce7c3508e00a',
            output: 'input_1',
          },
        ],
      },
    },
    inputs: {
      input_1: {
        connections: [
          {
            node: 'a2e91d1d-5fdb-4b7f-8432-f7f0f8cf3176',
            input: 'output_1',
          },
        ],
      },
    },
    pos_x: 3428.5,
    pos_y: 357.5,
  },
  {
    $id: '714d7c14-da89-47cf-8ff1-576f31169362',
    id: '714d7c14-da89-47cf-8ff1-576f31169362',
    type: 'option',
    storyId: 'test',
    data: {
      options: ['Come litle lady', "Let's eat at home"],
    },
    outputs: {
      output_1: {
        connections: [
          {
            node: '843b0ad5-074a-4221-bc9f-e5a7a826a870',
            output: 'input_1',
          },
        ],
      },
      output_2: {
        connections: [
          {
            node: '3f1e8359-806e-4570-88e5-ed9a29997caa',
            output: 'input_1',
          },
        ],
      },
    },
    inputs: {
      input_1: {
        connections: [
          {
            node: '4fc00ae8-6b44-47a6-8d8d-609da4817b47',
            input: 'output_1',
          },
        ],
      },
    },
    pos_x: 2178.5,
    pos_y: 46,
  },
  {
    $id: '3f1e8359-806e-4570-88e5-ed9a29997caa',
    id: '3f1e8359-806e-4570-88e5-ed9a29997caa',
    type: 'chat',
    storyId: 'test',
    data: {
      chats: [
        {
          id: 'rApRJoD2rmuQfYMtBzlF3',
          characterId: '1yssPZWt2u59Hag2j6iIP',
          imageUrl: '',
          message: 'Bring the love that you feel for me',
        },
        {
          id: '0G96r8MQAka-zQWTbkoA2',
          characterId: '1yssPZWt2u59Hag2j6iIP',
          imageUrl: '',
          message: "Come on, litle lady, come on don't do that",
        },
      ],
    },
    outputs: {
      output_1: {
        connections: [
          {
            node: 'a2e91d1d-5fdb-4b7f-8432-f7f0f8cf3176',
            output: 'input_1',
          },
        ],
      },
    },
    inputs: {
      input_1: {
        connections: [
          {
            node: '714d7c14-da89-47cf-8ff1-576f31169362',
            input: 'output_2',
          },
        ],
      },
    },
    pos_x: 2536.5,
    pos_y: 111,
  },
  {
    $id: '3f4fae53-6296-4b54-aa9b-e7298c860a40',
    id: '3f4fae53-6296-4b54-aa9b-e7298c860a40',
    type: 'option',
    storyId: 'test',
    data: {
      options: ['Coming up', 'You want a love?'],
    },
    outputs: {
      output_1: {
        connections: [
          {
            node: '7d75cb9d-98e0-43f2-b86e-1d3edc94a342',
            output: 'input_1',
          },
        ],
      },
      output_2: {
        connections: [
          {
            node: '843b0ad5-074a-4221-bc9f-e5a7a826a870',
            output: 'input_1',
          },
        ],
      },
    },
    inputs: {
      input_1: {
        connections: [
          {
            node: 'a24da713-ac2c-43ee-bad7-8206bef28b4e',
            input: 'output_1',
          },
        ],
      },
    },
    pos_x: 2235,
    pos_y: -356,
  },
  {
    $id: '843b0ad5-074a-4221-bc9f-e5a7a826a870',
    id: '843b0ad5-074a-4221-bc9f-e5a7a826a870',
    type: 'chat',
    storyId: 'test',
    data: {
      chats: [
        {
          id: 'uXV2FM1-sNGOmNmj929Xt',
          characterId: '1yssPZWt2u59Hag2j6iIP',
          imageUrl: '',
          message: 'To last forever',
        },
        {
          id: '_clR3hXAeDn-TjjqgfLmE',
          characterId: '1yssPZWt2u59Hag2j6iIP',
          imageUrl: '',
          message: 'I want to help you, with your problem',
        },
        {
          id: 'AWOummLmZltrSE1WNEbiP',
          characterId: '1yssPZWt2u59Hag2j6iIP',
          imageUrl: '',
          message: 'I say...',
        },
      ],
    },
    outputs: {
      output_1: {
        connections: [
          {
            node: 'a2e91d1d-5fdb-4b7f-8432-f7f0f8cf3176',
            output: 'input_1',
          },
        ],
      },
    },
    inputs: {
      input_1: {
        connections: [
          {
            node: '3f4fae53-6296-4b54-aa9b-e7298c860a40',
            input: 'output_2',
          },
          {
            node: '714d7c14-da89-47cf-8ff1-576f31169362',
            input: 'output_1',
          },
        ],
      },
    },
    pos_x: 2649,
    pos_y: -306.5,
  },
  {
    $id: '7d75cb9d-98e0-43f2-b86e-1d3edc94a342',
    id: '7d75cb9d-98e0-43f2-b86e-1d3edc94a342',
    type: 'chat',
    storyId: 'test',
    data: {
      chats: [
        {
          id: '1gleuVlhYpt8iWeB159UE',
          characterId: '1yssPZWt2u59Hag2j6iIP',
          imageUrl: '',
          message: 'You want friend to rely on, ',
        },
        {
          id: 'pB_8SRhKY0IMbUrhfp_Hr',
          characterId: 'MHAC5I8Vvnp7UMIYMyucL',
          imageUrl: '',
          message: 'One who never fade away',
        },
      ],
    },
    outputs: {
      output_1: {
        connections: [
          {
            node: '956f71c1-a560-423d-9d8c-2c929c538cb6',
            output: 'input_1',
          },
        ],
      },
    },
    inputs: {
      input_1: {
        connections: [
          {
            node: '3f4fae53-6296-4b54-aa9b-e7298c860a40',
            input: 'output_1',
          },
        ],
      },
    },
    pos_x: 2647.5,
    pos_y: -678.5,
  },
];
