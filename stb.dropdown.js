/*
* Shoot The Bit - jQuery Dropdown v0.1.0.2
* @author Luis Valencia
*/
;
(function ($) {
   function KeycodeInterpreter (keycode) {
      //Keyboard Enumerables
      var Keyboard = {
          Up:38,
          Down:40,
          Left:37,
          Right:39,
          Enter:13
      };
      //Object with static methods
      return {
         onSelectPrevious:function (block) {
            if (keycode == Keyboard.Up || keycode == Keyboard.Left) { block(); } //If I could I would simply like to yield to a block, instead of passing in a function
            return this;
         },
         onSelectNext:function (block) {
            if (keycode == Keyboard.Down || keycode == Keyboard.Right) { block(); }
            return this;
         },
         onSubmit:function (block) {
            if (keycode == Keyboard.Enter) { block(); }
            return this;
         },
         onCharacterInput:function (block) { 
            if (this._searchable(keycode)) { block(); }
            return this;
         },
         // "Private" Helper Method
         _searchable:function (keycode) {
            return keycode !== 0 && 
                keycode != Keyboard.Up && 
                keycode != Keyboard.Down && 
                keycode != Keyboard.Left && 
                keycode != Keyboard.Right;
         }
      };
   };
   //jQuery Empty Check
   $.fn.isEmpty = $.fn.isEmpty || function () {
      return this.length == 0;
   };
   $.fn.asSelector = $.fn.asSelector || function (selector, block) {
       if (this.is(selector)) { block(); }
   };
   //Generated HTML
   var $container = $('<div class="stb-select-container"><span class="selected"></span></div>');
   var $list = $('<ul class="stb-select" style="display:none;"></ul>');
   //Object Instance
   $.fn.stbDropdown = function (options) { 
      var $els = $(this); 
      //Hide Original Selects
      $els.hide();
      //Go through each select and create STB Dropdown
      $els.each(function(index,value) {
         //Visuals
         //Clone Containers and List Objects
         var $currentContainer = $container.clone();
         var $currentList = $list.clone();
         //Pull out Select Info and Copy it Over to our New Structure
         var $el = $(value);
         var $options = $el.find('option'); 
         //Insert Container into DOM
         $el.after($currentContainer);
         //Move select into Container
         $el.appendTo($currentContainer); 
         //Insert our Shell List
         $currentList.appendTo($currentContainer);
         //Copy over Options into List
         $options.each(function (index, value) {
            var $option = $(value);
            var $wrapper = $("<li></li>");
            var attributes = $option.prop("attributes"); 
            $wrapper.prop("attributes", attributes);
            //Copy over teh attributes
            $.each(attributes, function(index, attribute) {
               $wrapper.attr(attribute.name, attribute.value);
            });
            $wrapper.append($option.text());
            //Add it to our list
            $currentList.append($wrapper); 
         });
         //Filter Selected Options
         var selectedOptions = $el.children("option").filter(function (index, el) { 
            return $(el).is("[selected]"); 
         });
         //Set Selected 
         var $selected;
         if (selectedOptions.length == 0) {
             //Default to First Option
             $selected = $options.first();
         }
         else {
            //Default to First to multiple selections
            $selected = selectedOptions.first();
         }
         //Set the currently selected Default
         $currentContainer.find('.selected').text($selected.text());
         $currentContainer.close = function () {
            $(this).find('ul').hide();
         };
         $currentContainer.open = function () {
            $(this).find('ul').show();
         };
         //Behaviorals
         $currentContainer.on("click.stb.select", function() {
            //When the Click on our "select" dropdown box
            var $sel = $(this);
            //Close all other boxes
            var targets = $.grep($('.stb-select-container'), function (e) {
               return ! $sel.is($(e));
            });
            $(targets).find('ul').hide();
            //Toggle our Box
            $sel.find('ul').toggle();
         });
         $currentContainer.on("click.stb.option", "li", function(e) { 
            //Dont Trigger General Select
            e.stopPropagation();
            //Update Selected Text
            var $li = $(this); 
            var $currentContainer = $li.parents('.stb-select-container');
            var $currentlySelected = $currentContainer.find('span.selected');
            $currentlySelected.text($li.text());
            //Toggle our Dropdown
            $li.parents('ul').toggle();
            //Set Select Selected
            var $select = $currentContainer.find('select');
            $select.val($li.attr('value')).change(); //Make sure you trigger the change event
            $li.siblings().removeAttr('selected');
            $li.attr('selected', 'selected');
         }); 
         //Make Focusable
         $currentContainer.attr('tabindex', "1");
         //Bind Keystroke
         $currentContainer.on("keyup.stb", function (e) {
            var keycode = e.which;
            //Get Selected and Default
            var $selected = $currentContainer.find("li[selected]");
            var $defaultSelect = $currentContainer.find("li").first();
            //Default Behavior for no Selected Values
            if ($selected.isEmpty()) {
               $defaultSelect.attr("selected","selected");
               $currentContainer.open();
               return;
            }
            //Clear all Selected
            $selected.removeAttr("selected");
            //Make sure only one is selected
            var $singleSelected = $selected.first();
            //INterpret Keycode
            KeycodeInterpreter(keycode).onSelectPrevious(function () {
               var $previous = $singleSelected.prev();
               $previous.attr("selected", "selected");
               $singleSelected.asSelector(":first-child", function () { $currentContainer.close(); }); 
            })
            .onSelectNext(function () {
               var $next = $singleSelected.next(); 
               var $toSelect = $next;
               if ($next.isEmpty()) { $toSelect = $selected; }
               $toSelect.attr("selected", "selected");
            })
            .onSubmit(function () {
               var $selected = $currentContainer.find("li[selected]");
               $singleSelected.click(); //Simulate Click
            })
            .onCharacterInput(function () {
               var character = String.fromCharCode(keycode);
            });
         });
         //If an element is added after init
         $el.on("DOMNodeInserted", function (e) {
            //Add to List if it's an Option Tag
            var $option =  $(e.target); 
            if ($option.is('option')) {
               var $wrapper = $("<li></li>");
               var attributes = $option.prop("attributes"); 
               $wrapper.prop("attributes", attributes);
               $.each(attributes, function(index, attribute) {
                  $wrapper.attr(attribute.name, attribute.value);
               }); 
               $wrapper.append($option.text());
               $currentList.append($wrapper); 
            }   
         });
         //If an element is removed after init
         $el.on("DOMNodeRemoved", function (e) {
            //Remove from List if it's Option Tag
            var $option =  $(e.target);
            if ($option.is('option')) {
               $currentList.find("li:contains('"+$option.text()+"')").remove();
            }
         });
      });
   }
})(jQuery);
