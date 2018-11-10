# Html-Css/Scss-Starter-kit
- Html &amp; Css StarterKit
- 7-in-1 Folder Concept Used
- Can be used for creating own 3 party package like boostrap, materialise, semantic ui
- To compile SASS into CSS use the command => 
: npm run compile:sass
- Initailised with Basic styling.


### 7-in-1 Folder Structure
```
├── sass
│   ├── abstract              Folder 1
│   │   ├── _functions.scss   # all Scss function will be in the file
│   │   ├── _variables.scss   # variables will be mention here
│   │   └── _mixin.scss       # mixin will be here
│   ├── base                  Folder 2
│   │   ├── _animations.scss  # will contain aminations
│   │   ├── _topography.scss  # topography related stuff   
│   |   ├── _base.scss        # global style (i.e for html, body)
│   │   └── _utilities.scss   # contain special style like center, margin (styling which can be use anywhere)
│   ├── layout                 Folder 3
│   │   ├── _header.scss      # header styling
│   │   ├── _footer.scss      # foter styling
│   |   ├── _grid.scss        # grid styling
│   ├── components            Folder 4
│   │   ├── _button.scss      # button complete styling (can have different button class here)
│   │   ├── _heading.scss     # heading complete styling   
│   ├── pages                 Folder 5
│   │   ├── _home.scss        # contain styling of home page
│   │   ├── _about.scss       # contain styling related to above page
│   ├── theme                 Folder 6 ( all theme related thing)
│   ├── vendor                Folder 7 ( contain vendor styling like boostrap scss, materialise css) 
└── main.scss                # file only contant import statements
```
