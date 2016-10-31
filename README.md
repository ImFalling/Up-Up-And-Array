# Up-Up-And-Array
## A HTML, CSS, and JS based GUI for creating 2D arrays.

### Description
This is a web-based 2D Array Generator GUI made for my MonoGame framework game development.
I created it when I grew frustrated with Tile Map Apps like Tiled Map Manager,
and wanted a simple, reusable and barebones app.
So, I created one.

![Image Demonstrating the UI][logo]

[logo]: http://puu.sh/s1EIK/624cddaad3.png "Image Demonstrating the UI"

### Help
How to use:

First, either download a zip of the project, or visit my [Demo](https://imfalling.github.io/Up-Up-And-Array/);

Then, place any tiles you want in the folder named "img", and name it after the pattern
```javascript
tile_ID.png
```
Afterwards, just open index.html with your favorite browser (Tested on Chrome & FF),
and get started!

~~Note: In Chrome, the number input arrows are hidden. These are required to be pressed to change the ID in the pallet popup.
Writing a number in the input box wont be enough, you have to write a number and then increase or decrease the number using the arrows in order to update the current tile.~~ Fixed with update 1.1.2

## Changelog

### Update 1.2
#### - Added a zoom feature,
simply input a factor with which to scale the grid. (Default: 1)

### Update 1.1.2
#### - Added simpler tile selection,
the tile ID updates on keypress, so the arrows no longer have to be clicked.

### Update 1.1.1
#### - Fixed a bug with the fill button again,
this time restored functionality

#### - New Feature: **Load Arrays!**
Added a button for loading previously generated arrays with a specified syntax.
Useful for saving / loading, for working on longer projects.

### Update 1.1
#### - Fixed a bug with the fill button,
where returning null would clear the entire grid without forewarning.

#### - Removed the palett button,
and instead added a fixed palett field in the bottom left corner.

#### - New Feature: **Brush!**
Currently, the way to use the brush, is to simply click on a tile once,
which enables brush mode,  and then simply click on a final tile to exit
brush mode.
