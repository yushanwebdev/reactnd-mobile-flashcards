import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import flashCards from './data';

const STORAGE_KEY = 'Flashcards';
const NOTIFICATION_KEY = 'Flashcards:notifications';

export async function store(data = flashCards) {
    try {
        let latest = await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));

        return latest;
    } catch (e) {
        console.warn(e);
    }
}

async function merge(data) {
    try {
        const latest = await AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify(data))

        return latest;
    } catch (e) {
        console.warn(e);
    }
}

export async function getDecks() {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    const data = jsonValue != null ? JSON.parse(jsonValue) : null;

    return data;
}

export async function getDeck(id) {
    try {
        const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
        const data = jsonValue != null ? JSON.parse(jsonValue) : null;

        return data[id];

    } catch (e) {
        console.warn(e);
    }
}

export async function getQuestion(title, quizNo) {
    try {
        const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
        const data = jsonValue != null ? JSON.parse(jsonValue) : null;

        const question = data[title].questions[quizNo];

        return question;

    } catch (e) {
        console.warn(e);
    }
}

export async function saveDeckTitle(title) {
    try {
        let jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
        let data = jsonValue != null ? JSON.parse(jsonValue) : null;

        data = {
            ...data,
            [title]: {
                title,
                questions: [],
            }
        }

        return merge(data);

    } catch (e) {
        console.warn(e);
    }
}

export async function addCardToDeck(title, card) {
    try {
        const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
        let data = jsonValue != null ? JSON.parse(jsonValue) : null;

        data = {
            ...data,
            [title]: {
                title: title,
                questions: [
                    ...data[title].questions,
                    card
                ],
            }
        }

        return merge(data);

    } catch (e) {
        console.warn(e);
    }
}

export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}

export function createNotification() {
  return {
    title: 'Log your stats!',
    body: '👋 don\'t forget to do your studies for today!',
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true
    }
  }
}

export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if(data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if(status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()

              let tommorow = new Date();
              tommorow.setDate(tommorow.getDate() + 1);
              tommorow.setHours(8);
              tommorow.setMinutes(0);

              Notifications.scheduleNotificationAsync(
                createNotification(),
                {
                  time: tommorow,
                  repeat: 'day',
                }
              )

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
            }
          })
      }
    })
}