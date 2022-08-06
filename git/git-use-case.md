Here is an example of a git use-case. I created a repository on github (test.git) and cloned it. The default branch was named *main* instead of the usual *master*.

> **Clone**
> 
> ![[git-cmd-1.png]]

> **Add a file**
> 
> ![[git-cmd-2.png]]

> **Stage the file**
> 
> ![[git-cmd-3.png]]

<div style="page-break-after: always;"></div>

> **Commit**
> 
> ![[git-cmd-4.png]]

> **Push**
>
> ![[git-cmd-5.png]]

> **Switch to a new branch**
> 
> ![[git-cmd-6.png]]

> **Remove the file**
> 
> ![[git-cmd-7.png]]

> **Merge the 2 branches** 
> 
> ![[git-cmd-8.png]]

<div style="page-break-after: always;"></div>

> **Pull with a conflict**
> I created a file named *conflict.txt* and someone else also did, we both wrote a single line and git does not know how to handle the situation, it gives me a merge conflict that I have to resolve myself.
> ![[git-cmd-9.png]]
> To start resolving the conflict, we must first commit what was not commited.
> ![[git-cmd-10.png]]
> The conflicting file :
> ![[git-cmd-11.png]]
> conflicts are marked with <<< and >>>, above the \=\=\= line is the current file and below is the file as it is currently on the remote.
> To fix the conflict you can do whatever, keep both parts, remove one or both... *Never leave the <<< \=\=\= and >>> lines!*

<div style="page-break-after: always;"></div>

> **To finish fixing the conflict, commit one last time**
>
> ![[git-cmd-12.png]]