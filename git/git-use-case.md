Here is an example of a git use-case. I created a repository on github (test.git) and cloned it. The default branch was named *main* instead of the usual *master*.

> **Clone**
> 
> ![missing image](resources/git-cmd-1.png)

> **Add a file**
> 
> ![missing image](resources/git-cmd-2.png)

> **Stage the file**
> 
> ![missing image](resources/git-cmd-3.png)

> **Commit**
> 
> ![missing image](resources/git-cmd-4.png)

> **Push**
>
> ![missing image](resources/git-cmd-5.png)

> **Switch to a new branch**
> 
> ![missing image](resources/git-cmd-6.png)

> **Remove the file**
> 
> ![missing image](resources/git-cmd-7.png)

> **Merge the 2 branches** 
> 
> ![missing image](resources/git-cmd-8.png)

> **Pull with a conflict**
> 
> I created a file named *conflict.txt* and someone else also did, we both wrote a single line and git does not know how to handle the situation, it gives me a merge conflict that I have to resolve myself.
> ![missing image](resources/git-cmd-9.png)
> To start resolving the conflict, we must first commit what was not commited.
> ![missing image](resources/git-cmd-10.png)
> The conflicting file :
> ![missing image](resources/git-cmd-11.png)
> conflicts are marked with <<< and >>>, above the \=\=\= line is the current file and below is the file as it is currently on the remote.
> To fix the conflict you can do whatever, keep both parts, remove one or both... *Never leave the <<< \=\=\= and >>> lines!*

> **To finish fixing the conflict, commit one last time**
>
> ![missing image](resources/git-cmd-12.png)