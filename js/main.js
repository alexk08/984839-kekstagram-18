'use strict'

var getRandomIntInclusive = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}

var arrayOfPhotos = [
  {
    url: 'photos/1.jpg',
    description: 'описание фотографии',
    likes: getRandomIntInclusive(15, 200),
    comments: [
      {
        avatar: "img/avatar-6.svg",
        message: "В целом всё неплохо. Но не всё.",
        name: "Артем"
      },
      {
        avatar: "img/avatar-1.svg",
        message: "Всё отлично!",
        name: "Иван"
      }
    ]
  },
  {
    url: 'photos/2.jpg',
    description: 'описание фотографии',
    likes: getRandomIntInclusive(15, 200),
    comments: [
      {
        avatar: "img/avatar-2.svg",
        message: "Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.",
        name: "Федор"
      },
      {
        avatar: "img/avatar-3.svg",
        message: "Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.",
        name: "Мария"
      }
    ]
  }
];

console.log(arrayOfPhotos);
