export const VOLUNTEERS_DATA = [
  {
    _id: 'i1',
    name: 'Enviromental Volunteer Work',
    types: [
      {
        _id: 't1',
        name: 'Conservation',
      },
      {
        _id: 't2',
        name: 'Climate Change',
      },
      {
        _id: 't3',
        name: 'Gardening & Farm Work',
      },
    ],
  },
  {
    _id: 'i2',
    name: 'Animal Volunteer Work',
  },
  {
    _id: 'i3',
    name: 'Social/Community Volunteer Work',
  },
  {
    _id: 'i4',
    name: 'Health & Wellness Volunteer Work',
  },
  {
    _id: 'i5',
    name: 'Sports & Leisure Volunteer Work',
  },
  {
    _id: 'i6',
    name: 'Philanthropy',
  },
];

export const SERVICE_PROVIDERS = [
  {
    id: 'BSPSubscription',
    name: 'BSP',
    description: '(Business Service Provider)',
  },
  {
    id: 'MBSSubscription',
    name: 'MBS',
    description: '(Micro Business Service Provider)',
  },
  {
    id: 'BSLSubscription',
    name: 'BSL',
    description: '(Business Service Location)',
  },
  {
    id: 'IWSubscription',
    name: 'IW',
    description: '(Industry Worker)',
  },
];

export const BSP_SUBS = [
  {id: 'i1', name: '$9.99', description: 'Per Day'},
  {id: 'i2', name: '$25', description: 'Per Month'},
  {id: 'i3', name: '$199', description: 'Per Annual'},
];

export const MBS_SUBS = [
  {id: 'i1', name: '$19.99', description: 'Per Day'},
  {id: 'i2', name: '$50', description: 'Per Month'},
  {id: 'i3', name: '$499', description: 'Per Annual'},
];

export const BSL_SUBS = [{id: 'i3', name: '$199', description: 'Per Annual'}];

export const PROFILE_OPTIONS = [
  {id: 'p1', name: 'Profile Overview'},
  {id: 'p2', name: 'Qualifying Information'},
  {
    id: 'p3',
    name: 'Visual Validation',
    description: '(Upload Photos or Videos)',
  },
  {id: 'p4', name: 'Brand Information'},
  {id: 'p5', name: 'Professional Certifications'},
  {id: 'p6', name: 'Licensing'},
  {id: 'p7', name: 'Reference'},
  {id: 'p8', name: 'Liability Insurance / Certification of Insurance'},
];

export const SERVICE_PROVIDERS_SPECIALITY = [
  {
    _id: 'p1',
    name: 'Home Improvement',
    types: [
      {
        _id: 't1',
        name: 'Remodeling',
      },
      {
        _id: 't2',
        name: 'Energy Efficiency',
      },
      {
        _id: 't3',
        name: 'Green Home Improvement Projects',
      },
      {
        _id: 't4',
        name: 'Swimming Pools',
      },
      {
        _id: 't5',
        name: 'Hot Tubs',
      },
      {
        _id: 't6',
        name: 'Saunas',
      },
      {
        _id: 't7',
        name: 'Landscaper',
      },
    ],
  },
  {
    _id: 'p2',
    name: 'Building & Construction',
    types: [
      {
        _id: 't1',
        name: 'New Structure & Outfitting',
      },
    ],
  },
  {
    _id: 'p3',
    name: 'Landscape',
    types: [
      {
        _id: 't1',
        name: 'New Structure & Outfitting',
      },
    ],
  },
  {
    _id: 'p4',
    name: 'Interior Décor',
    types: [
      {
        _id: 't1',
        name: 'New Structure & Outfitting',
      },
    ],
  },
  {
    _id: 'p5',
    name: 'Household Services',
    types: [
      {
        _id: 't1',
        name: 'New Structure & Outfitting',
      },
    ],
  },
  {
    _id: 'p6',
    name: 'Electrical Tech',
    types: [
      {
        _id: 't1',
        name: 'New Structure & Outfitting',
      },
    ],
  },
  {
    _id: 'p7',
    name: 'Engineering',
    types: [
      {
        _id: 't1',
        name: 'New Structure & Outfitting',
      },
    ],
  },
  {
    _id: 'p8',
    name: 'Art',
    types: [
      {
        _id: 't1',
        name: 'New Structure & Outfitting',
      },
    ],
  },
  {
    _id: 'p9',
    name: 'Guru',
    types: [
      {
        _id: 't1',
        name: 'New Structure & Outfitting',
      },
    ],
  },
];

export const STATE = [
  {id: 's1', name: 'New York (NY)'},
  {id: 's2', name: 'North Carolina (NC)'},
];

export const CITY = [
  {id: 's1', name: 'New York City'},
  {id: 's2', name: 'Newburgh'},
];

export const COUNTRY = [
  {id: 's1', name: 'Bronx'},
  {id: 's2', name: 'Kings'},
];

export const SCHEDULE_TIME = [
  {
    id: 'i1',
    time: '1:00  - 2:00 PM',
  },
  {
    id: 'i2',
    time: '2:00 - 3:00 PM',
  },
  {
    id: 'i3',
    time: '3:00 - 4:00 PM',
  },
  {
    id: 'i4',
    time: '4:00 - 5:00 PM',
  },
  {
    id: 'i5',
    time: '5:00 - 6:00 PM',
  },
  {
    id: 'i6',
    time: '6:00 - 7:00 PM',
  },
  {
    id: 'i7',
    time: '7:00 - 8:00 PM',
  },
];

export const REPEAT_SCHEDULE = [
  {id: 'i1', type: 'Repeat Weekdays'},
  {id: 'i2', type: 'Repeat Weekdays & Weekends'},
  {id: 'i3', type: 'Only Weekends'},
  {id: 'i4', type: 'Repeat Entire Month'},
  {id: 'i5', type: 'Repeat Entire Year'},
];

export const INTERESTS = (types = [
  {
    _id: 't1',
    name: 'Remodeling',
  },
  {
    _id: 't2',
    name: 'Energy Efficiency',
  },
  {
    _id: 't3',
    name: 'Green Home Improvement Projects',
  },
  {
    _id: 't4',
    name: 'Swimming Pools',
  },
  {
    _id: 't5',
    name: 'Hot Tubs',
  },
  {
    _id: 't6',
    name: 'Saunas',
  },
  {
    _id: 't7',
    name: 'Landscaper',
  },
]);

export const MATCHED_SERVICE_PROVIDERS = [
  {
    id: 'i1',
    image:
      'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600',
    name: 'Phillip Bator',
    distance: '93m away',
    type: 'Landscaper',
  },
  {
    id: 'i2',
    image:
      'https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&w=600',
    name: 'Nolan Curtis',
    distance: '104m away',
    type: 'Electrical',
  },
  {
    id: 'i3',
    image:
      'https://images.pexels.com/photos/874158/pexels-photo-874158.jpeg?auto=compress&cs=tinysrgb&w=600',
    name: 'Phillip Bator',
    distance: '22m away',
    type: 'Landscaper',
  },
  {
    id: 'i3sad214',
    image:
      'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=600',
    name: 'Phillip Bator',
    distance: '222m away',
    type: 'Landscaper',
  },
  {
    id: 'i323424',
    image:
      'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=600',
    name: 'Phillip Bator',
    distance: '222m away',
    type: 'Landscaper',
  },
  {
    id: 'i1234',
    image:
      'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=600',
    name: 'Phillip Bator',
    distance: '222m away',
    type: 'Landscaper',
  },
  {
    id: 'i32dasd14',
    image:
      'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=600',
    name: 'Phillip Bator',
    distance: '222m away',
    type: 'Landscaper',
  },
  {
    id: 'i32dsadaadasdsada14',
    image:
      'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=600',
    name: 'Phillip Bator',
    distance: '222m away',
    type: 'Landscaper',
  },
  {
    id: 'i32adsfdasdffds14',
    image:
      'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=600',
    name: 'Phillip Bator',
    distance: '222m away',
    type: 'Landscaper',
  },
  {
    id: 'i3223342424asdfdcsdfa14',
    image:
      'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=600',
    name: 'Phillip Bator',
    distance: '222m away',
    type: 'Landscaper',
  },
  {
    id: 'i45wreiwrrjsdfnsfn132',
    image:
      'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=600',
    name: 'Phillip Bator',
    distance: '222m away',
    type: 'Landscaper',
  },
];

export const MATCHED_TASKS = [
  {
    _id: 'sasdj1',
    name: 'Cooper',
    image:
      'https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&w=600',
    postedTime: 'just now',
    title: 'Help me Remodel My house',
    description: 'I need someone who can help me remodel my house. ',
  },
  {
    _id: 'sasadasdsfgerqjrjnqesdj1',
    name: 'Zaire',
    image:
      'https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&w=600',
    postedTime: '3 min ago',
    title: 'Help me Remodel My house',
    description: 'I need someone who can help me remodel my house. ',
  },
  {
    _id: 'sasdsadasdj1',
    name: 'Cooper',
    image:
      'https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&w=600',
    postedTime: '5 min ago',
    title: 'Help me Remodel My house',
    description: 'I need someone who can help me remodel my house. ',
  },
];
