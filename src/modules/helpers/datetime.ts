import moment from 'moment'

export const dateDB = (date: string) => moment(date, 'YYYY-MM-DD')

export const dateTimeDB = (dateTime: string) => moment(dateTime, 'YYYY-MM-DD HH:mm:ss')

export const dateTimeISO = moment(new Date()).toISOString()

export const dateTimeID = (dateTime: Date) => moment(dateTime).format('YYYY-MM-DD HH:mm:ss')

export const addDateTime = (amount: number, unit: any, date: string = moment().format('YYYY-MM-DD HH:mm:ss')) => moment(date).add(amount, unit).format('YYYY-MM-DD HH:mm:ss')

export const substractDateTime = (amount: number, unit: any, date: any) => moment(date, 'YYYY-MM-DD HH:mm:ss').subtract(amount, unit).format('YYYY-MM-DD HH:mm:ss')
