# stb-dropdown
a jQuery Dropdown that doesn't give a shit.  
Basically a jQuery plugin to use to replace your selects with custom selects.

##Why STB jQuery Dropdown?

Can you do this?  

```javascript
$('select').stbDropdown();
```

Do you like saving time?  
Then this is the plugin for you.  

I don't about you, but I don't want to have to write out some shitty div with custom attributes and classes that get target by some import ... blah blah blah.   

Look.  
Do you know what a select tag is? Do you know how to work one?   
Of course you do. If not google that shit.  

Do you care about the internal workings of this plug?   
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
jQuery idk which version, I ain't got time to see how far this one goes.
probably like jQuery 1.6+ or something. 
Actually if you find out lemme know. I'll update this section.
