import moment from 'moment';

import { ActivityData, DataCart, DataItem, ExerciseData, ResItem } from '../types/types';

export const sortDataByDate = (data: Array<{ day: string; weight: number }>) =>
    data.sort(
        (a, b) =>
            new Date(a.day.split('.').reverse().join('.')).getTime() -
            new Date(b.day.split('.').reverse().join('.')).getTime(),
    );

export function formatDate(data: Array<{ day: string; weight: number }>) {
    return data.map((item) => {
        const day = new Date(item.day).toLocaleDateString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
        });

        return { ...item, day };
    });
}

export function sortAndFormatDays(data: Array<{ day: string; weight: number }>) {
    const daysOfWeek = [
        'Понедельник',
        'Вторник',
        'Среда',
        'Четверг',
        'Пятница',
        'Суббота',
        'Воскресенье',
    ];

    const formattedData = data.map((item) => {
        const date = new Date(item.day);
        const dayOfWeek = daysOfWeek[(date.getUTCDay() + 6) % 7];

        return { ...item, day: dayOfWeek };
    });

    return formattedData.sort((a, b) => daysOfWeek.indexOf(a.day) - daysOfWeek.indexOf(b.day));
}

export function filterActivityData(
    activitiesData: ActivityData[],
    start: Date,
    end: Date,
    trainingName: string,
) {
    return activitiesData.filter((activity) => {
        const activityDate = new Date(activity.date);

        activityDate.setHours(0, 0, 0, 0);

        return (
            activityDate >= start &&
            activityDate <= end &&
            (trainingName === 'Все' ? true : activity.name === trainingName)
        );
    });
}

export function calculateAverageLoad(filteredData: ActivityData[], start: Date, end: Date) {
    const loadByDay: { [key: string]: { totalLoad: number; totalExercises: number } } = {};

    filteredData.forEach((activity) => {
        activity.exercises.forEach((exercise) => {
            const load =
                exercise.approaches && exercise.replays && exercise.weight
                    ? exercise.approaches * exercise.weight * exercise.replays
                    : 0;
            const activityDate = new Date(activity.date).toISOString().split('T')[0];

            if (loadByDay[activityDate]) {
                loadByDay[activityDate].totalLoad += load;
                loadByDay[activityDate].totalExercises += 1;
            } else {
                loadByDay[activityDate] = { totalLoad: load, totalExercises: 1 };
            }
        });
    });

    const dateArray = [];

    for (let dt = new Date(start); dt <= end; dt.setDate(dt.getDate() + 1)) {
        dateArray.push(new Date(dt));
    }

    dateArray.forEach((date) => {
        const dateString = moment(date).format('YYYY-MM-DD');

        if (!loadByDay[dateString]) {
            loadByDay[dateString] = { totalLoad: 0, totalExercises: 1 };
        }
    });

    const result = Object.keys(loadByDay).map((date) => {
        const { totalLoad, totalExercises } = loadByDay[date];
        const averageLoad = Math.round(totalLoad / totalExercises);

        return { day: date, weight: averageLoad };
    });

    return result;
}

export function calculateTotalLoad(filteredData: ActivityData[]) {
    let totalLoad = 0;

    filteredData.forEach((activity) => {
        activity.exercises.forEach((exercise) => {
            const load =
                exercise.approaches && exercise.replays && exercise.weight
                    ? exercise.approaches * exercise.weight * exercise.replays
                    : 0;

            totalLoad += load;
        });
    });

    return totalLoad;
}

export function calculateDailyLoad(totalLoad: number, totalDays: number) {
    if (totalDays === 0) {
        return 0;
    }

    return Math.round(totalLoad / totalDays);
}

export function calculateTotalReplays(filteredData: ActivityData[]) {
    let totalReplays = 0;

    filteredData.forEach((activity) => {
        activity.exercises.forEach((exercise) => {
            if (exercise.replays !== undefined) {
                totalReplays += exercise.replays;
            }
        });
    });

    return Math.round(totalReplays);
}

export function calculateTotalApproaches(filteredData: ActivityData[]) {
    let totalApproaches = 0;

    filteredData.forEach((activity) => {
        activity.exercises.forEach((exercise) => {
            if (exercise.approaches !== undefined) {
                totalApproaches += exercise.approaches;
            }
        });
    });

    return Math.round(totalApproaches);
}

export function calculateMostFrequentExercise(activitiesData: ActivityData[]) {
    const exerciseCounts: Record<string, number> = {};

    activitiesData.forEach((activity) => {
        activity.exercises.forEach((exercise) => {
            if (exercise.name in exerciseCounts) {
                exerciseCounts[exercise.name] += 1;
            } else {
                exerciseCounts[exercise.name] = 1;
            }
        });
    });

    let mostFrequentExercise = null;
    let maxCount = 0;

    Object.keys(exerciseCounts).forEach((exercise) => {
        if (exerciseCounts[exercise] > maxCount) {
            mostFrequentExercise = exercise;
            maxCount = exerciseCounts[exercise];
        }
    });

    return mostFrequentExercise;
}

export function calculateMostFrequentTraining(activitiesData: ActivityData[]) {
    const trainingCounts: Record<string, number> = {};

    activitiesData.forEach((activity) => {
        if (activity.name in trainingCounts) {
            trainingCounts[activity.name] += 1;
        } else {
            trainingCounts[activity.name] = 1;
        }
    });

    let mostFrequentTraining = null;
    let maxCount = 0;

    Object.keys(trainingCounts).forEach((training) => {
        if (trainingCounts[training] > maxCount) {
            mostFrequentTraining = training;
            maxCount = trainingCounts[training];
        }
    });

    return mostFrequentTraining;
}

export function getDayOfWeek(date: Date | string) {
    const dayOfWeek = new Date(date).getDay();

    return Number.isNaN(dayOfWeek)
        ? null
        : ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'][
              (dayOfWeek + 6) % 7
          ];
}

export function countExercisesByDay(activitiesData: ActivityData[]) {
    const exercisesByDay: { [key: string]: { [key: string]: number } } = {};

    activitiesData.forEach((activity) => {
        const dayOfWeek = getDayOfWeek(new Date(activity.date));

        if (dayOfWeek !== null) {
            activity.exercises.forEach((exercise) => {
                if (!exercisesByDay[dayOfWeek]) {
                    exercisesByDay[dayOfWeek] = {};
                }
                if (!exercisesByDay[dayOfWeek][exercise.name]) {
                    exercisesByDay[dayOfWeek][exercise.name] = 0;
                }
                exercisesByDay[dayOfWeek][exercise.name] += 1;
            });
        }
    });

    return exercisesByDay;
}

export function transformExerciseData(exercisesByDay: ExerciseData) {
    const data: DataItem[] = [];
    const res: ResItem[] = [];

    Object.keys(exercisesByDay).forEach((dayOfWeek) => {
        let mostFrequentExercise = null;
        let maxCount = 0;

        Object.keys(exercisesByDay[dayOfWeek]).forEach((exercise) => {
            if (exercisesByDay[dayOfWeek][exercise] > maxCount) {
                mostFrequentExercise = exercise;
                maxCount = exercisesByDay[dayOfWeek][exercise];
            }
            const foundExercise = res.find((item) => item.type === exercise);

            if (foundExercise) {
                foundExercise.value += exercisesByDay[dayOfWeek][exercise];
            } else {
                res.push({ type: exercise, value: exercisesByDay[dayOfWeek][exercise] });
            }
        });
        data.push({ week: dayOfWeek, value: mostFrequentExercise });
    });

    return { data, res };
}

export function convertToPercentage(res: ResItem[]) {
    const totalExercises = res.reduce((total, exercise) => total + exercise.value, 0);

    const newRes = res.map((exercise) => ({
        ...exercise,
        value: Math.round((exercise.value / totalExercises) * 100),
    }));

    return newRes;
}

export function sortDataByWeekdays(data: DataItem[]) {
    const weekDays = [
        'Понедельник',
        'Вторник',
        'Среда',
        'Четверг',
        'Пятница',
        'Суббота',
        'Воскресенье',
    ];

    const sortedData = weekDays.map((day) => {
        const foundDay = data.find((item) => item.week === day);

        return foundDay || { week: day, value: '' };
    });

    return sortedData;
}

export function get28DayPeriod() {
    const today = new Date();

    today.setHours(0, 0, 0, 0);
    const twentyEightDaysAgo = new Date(today.getTime() - 27 * 24 * 60 * 60 * 1000);

    const dayOfWeek = twentyEightDaysAgo.getDay();

    const daysToAdd = dayOfWeek >= 1 ? 8 - dayOfWeek : 1;

    const nextMonday = new Date(twentyEightDaysAgo.getTime() + daysToAdd * 24 * 60 * 60 * 1000);

    const endDate = new Date(today.getTime() + daysToAdd * 24 * 60 * 60 * 1000);

    return { start: nextMonday, end: endDate };
}

export function groupByWeeks(data: DataCart[]) {
    const weeks = new Map<string, DataCart[]>();

    data.forEach((item) => {
        const date = new Date(item.day);
        const dayOfWeek = date.getDay();

        const weekStart = new Date(
            date.setDate(date.getDate() - ((dayOfWeek + 6) % 7)),
        ).toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit' });
        const weekEnd = new Date(
            date.setDate(date.getDate() - date.getDay() + 6),
        ).toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit' });
        const weekRange = `неделя ${weekStart}-${weekEnd}`;

        if (!weeks.has(weekRange)) {
            weeks.set(weekRange, []);
        }

        const formattedDay = new Date(item.day).toLocaleDateString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });

        const weekData = weeks.get(weekRange);

        if (weekData) {
            weekData.push({ ...item, day: formattedDay });
        }
    });

    return weeks;
}
