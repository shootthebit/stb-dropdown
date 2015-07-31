# stb-dropdown
a jQuery Dropdown that doesn't give a shit.

##Why STB jQuery Dropdown?

Can you do this?  

```javascript
$('select').stbDropdown();
```

Do you like saving time?  
Then this is the plugin for you.  

I hate looking at stuff like this. 
```html
<div class="dropdown">
  <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
    Dropdown
    <span class="caret"></span>
  </button>
  <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
    <li><a href="#">Action</a></li>
    <li><a href="#">Another action</a></li>
    <li><a href="#">Something else here</a></li>
    <li><a href="#">Separated link</a></li>
  </ul>
</div>
```
Every time I want to do a fully stylable select.

So what can we do about it?   
Look.  
Do you know what a select tag is? Do you know how to work one?   
Of course you do. 

Do you care about the internal workings of this plug in?   
No, if you did you'd roll out your own select.   

You just want a stylable select that works when you do a form submission right?   
Okay then use this plugin.  

##Applying your own styling

The actual box that looks like a dropdown  
```css
.stb-select-container {
   background:red;
}
```

The dropdown that appears  
```css
.stb-select {
   background:red;
}
```

Wanna edit the spacing between junk?  
```css
.stb-select li + li {
   margin:0;
}
```
That's cool it's just a ul li, go nuts.   

Don't like the caret?   
```css
.stb-select::after {
   font-family: FontAwesome;
   opacity:0.54;
   content:"\f107";
   position:absolute;
   right:8px;
}
```
That's cool neither did I.   
Add something nicer there.

##Custom jQuery Animations 
The javascript for this shit isn't that complicated, mod it. Go ahead.  
You want to slide appear? .slideDown()/.slideUp() go ahead. Go on, this is all you.  

##Dependencies
We got 1 freaking dependency and it's jQuery.   
I don't know which version, I ain't got time to see how far this one goes.
Probably like jQuery 1.6+ or something. 
Actually if you find out lemme know. I'll update this section.

##This is kinda rag-tag you got something more official?
Yeah, you're probably looking for this plugin.   
https://github.com/silviomoreto/bootstrap-select

##Why bother doing this then?
Ah, we've gotten to the root of things.  
Come listen to our podcast http://www.shootthebit.com/ I'm sure you'll love it.

## Copyright and license

Copyright (C) 2015 bootstrap-select

Licensed under [the MIT license](LICENSE).
