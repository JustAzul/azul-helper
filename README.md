# Azul Helper

Some functions that may help you somehow

### Prerequisites

I recommend to try this only in node V10/LTS or above.

### Installing

```
npm install azul-helper
```

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Almost every Method returns a promise, so you can use `await` or `then`
* Thats all folks!

## Methods

### sleep(ms)
Returns a promise that is solved after `ms` miliseconds, goot to use `await` or `then`
* `ms` time in miliseconds

### isURL(str)
Checks if str is a valid valid url, by returning true or false
* `str` desired string to do the magic

### isTradeOfferURL(str)
Checks if str is a valid trade offer url, by returning true or false
* `str` desired string to do the magic

### isSteamID64(str)
Checks if str is a SteamID64, by returning true or false
* `str` desired string to do the magic

### GetSteamID64FromURL(str)
Returns the first SteamID64 found in a desired string, can return null if didn't manage to find any
* `str` desired string to do the magic

### TimeStamp(date)
Return an object with a formated date `YYYY-MM-DD` and time `HH:mm:ss` of the date `date` or the current system time if ommited.
* `date` date to be formated, if null or ommited, will use current system time

### formatNumber(number)
Format a number to make it more readable (e.g transforms 9999 to 9,999)
* `number` number to be formated

### readJSON(filepath)
Safe load a JSON file and parse it, if file doesn't exists, or if it fails to parse the json(bad json), it will return an emptry json.
* `filepath` obvious, the filepath..
