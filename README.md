# Up-Up-And-Array
## A HTML, CSS, and JS based GUI for creating 2D arrays.

### Description
This is a web-based 2D Array Generator GUI made for my MonoGame framework game development.
I created it when I grew frustrated with Tile Map Apps like Tiled Map Manager,
and wanted a simple, reusable and **barebones** app.
So, I created one.

![Image Demonstrating the UI][logo]

[logo]: http://i.imgur.com/BHWYEil.png "Image Demonstrating the UI"

### Help
How to use:

First, either download a zip of the project, or visit my [Demo](https://imfalling.github.io/Up-Up-And-Array/) if you simply want to try out the interface.

Then, place any tiles you want in the folder named "tiles", and name them after the pattern
```javascript
number.x
```
Where x is your file extension of choice.

(Supported file extensions are JPEG, JPG, PNG and BMP. All tiles must have the same extension.)

Afterwards, just open index.html with your favorite browser (Tested on Chrome & FF),
and get started. 

Create a new Map by clicking "Tools", and then "New". Enter your chosen file extension, and the tilegrid's dimension.
After that, you'll find your pallet in the bottom left corner of the screen.

When you're finished with your masterpiece, simply click "Generate", in order to have the program spit out a C# syntaxed 2D Array.

**Thanks for using Up, Up and Array!**

## Changelog

### Update 2.0
#### - Reworked entire UI
Created a slightly easier to use UI.

#### - Better Code Structure
Makes it easier to add and modify code.
Markup.js is a file containing templates for popup messages.
Tools.js is a file containing functions used throughout the project.
Main.js still remains what it once was - the core functionalities.

#### - Updated Images and Guides on this readme
With user availability in mind.

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
