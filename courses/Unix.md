The unix Kernel is either a monolitic program or a set of drivers + a set of built-ins, all compiled from C code.

- filesystem
- scheduler
- driver initialization
- memory manager
- the init process (often systemd)

**Driver initramfs (~=initrd)**: used by the boot loader to attach file drivers, "load" the partition system and the filesystem. The boot loader can then load the installed OS.

**qemu**: virtualization toolbox, able to run a kernel without a bios
**busybox**: component that can be used inside an initrd to provide common commands (sh, ls, cat...) by creating a symbolic link inside initrd with name matching the command's.
