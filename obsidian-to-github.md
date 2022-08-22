Most documents here were created with [Obsidian](https://obsidian.md). Github's markdown engine does not support exactly the same set of features, so they may be a bit less visually interesting when viewed from github. 

To convert an obsidian file to a github one, apply the following regex replacements :
```regex
> ?\[!(?:abstract|tldr|check|info)\] (.*)\n
> __Note__**$1**\n>\n

> ?\[!(?:attention|warning)\] (.*)\n
> __Warning__ **$1**\n>\n

!\[\[(.*)\]\]
![missing image "$1"](resources/$1)
```
Images must be placed in an adjacent `resources/` directory.

> TODO create a script that does that automatically
