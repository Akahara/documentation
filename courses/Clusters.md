### Compiling and running
`mpicc` is an alias for `gcc` with the right additional include directories already set.
`mpirun`/`mpiexec -n <instance count> <compiled file>` 
When `<instance count>` is not supplied the machine number of cores is used, if it is set and higher than the number of available cores `--oversubscribe` must be used too.

### C api
Each instance can be in one or more groups, the `Comm` argument of `MPI_XX` functions is used to retrieve information about a specifig group of the current process.

```C
void MPI_Init(int *argc, const char ***argv);
// usable from everywhere, the default communication group
#define MPI_COMM_WORLD ...
// get the rank (id) of the current process and the total number of processes
void MPI_Comm_rank(MPI_Comm comm, int *rank);
void MPI_Comm_size(MPI_Comm comm, int *size);
// send a message, the call is blocking until sent
int MPI_Send(
	void *buf,             // raw data
	int count,             // size of the data array
	MPI_Datatype datatype, // type of *buf (int, float, somestruct...)
	int dest,              // rank
	int tag,               // optional
	MPI_Comm comm,
);
// receive a message, blocking
int MPI_Recv(
	void *buf,             // raw data input buffer
	int count,             // size of the received data array
	MPI_Datatype datatype,
	int source,            // rank
	int tag,
	MPI_Comm comm, 
	MPI_Status *status,    // error/success
);
// MPI_Datatype options
enum MPI_Datatype {
	MPI_INT,
	MPI_FLOAT,
	// ...
}
// can be used as the <source> argument of MPI_Recv
#define MPI_ANY_SOURCE ...
// can be used as the <tag> argument of MPI_Recv
#define MPI_ANY_TAG ...
// can be used as the <status> argument of MPI_Recv
#define MPI_STATUS_IGNORE ...
// default values for rank, does not match any instance
#define MPI_PROC_NULL ...
// send and receive at the same time, the same buffer can be used to write and read
int MPI_Sendrecv(
	void *sendbuf, int sendcount, MPI_Datatype sendtype, int dest, int sendtag,
	void *recvbuf, int recvcount, MPI_Datatype recvtype, int source, int recvtag,
	MPI_Comm comm, MPI_Station *status,
);
```

Beware of `MPI_Send/Recv`, the sending operation waits for a reception confirmation only sent by `MPI_Recv`, if two processes try to send a message to each other they will deadlock because they will both wait for the other to call `MPI_Recv`. Instead do use `MPI_Sendrecv`.

```C
// wait for all processed in comm to reach the Barrier() call
int MPI_Barrier(MPI_Comm comm);
// broadcast a message or receive the broadcasted message depending on if root is rank of the current process (root is always the sender)
int MPI_Bcast(void *buffer, int count, MPI_Datatype datatype, int root, MPI_Comm comm);
// splits an array and sends parts to each process, and receives if root is not the current process' rank
// sendbuf must be of size sendcount*MPI_Comm_size
// recvbuf must be of size sendcount
int MPI_Scatter(
	void *sendbuf, int sendcount, MPI_Datatype sendtype,
	void *recvbuf, int recvcount, MPI_Datatype recvtype,
	int root, MPI_Comm comm);
// same idea but in reverse
// recvbuf must be of size sendcount*MPI_Comm_size
// sendbuf must be of size sendcount
int MPI_Gather(
	void *sendbuf, int sendcount, MPI_Datatype sendtype,
	void *recvbuf, int recvcount, MPI_Datatype recvtype,
	int root, MPI_Comm comm);
// same idea but all processes send one value and receive values of all other
// recvbuf must be of size sendcount*MPI_Comm_size
// sendbuf must be of size sendcount
int MPI_Allgather(
	void *sendbuf, int sendcount, MPI_Datatype sendtype,
	void *recvbuf, int recvcount, MPI_Datatype recvtype,
	MPI_Comm comm);
// each process sends a different number of values and one process (root) receives all values at once
// sendcount of the process with rank R must match recvcounts[R]
// displacements[i] = sum(recvcounts[0..i-1]) to make things simple
int MPI_Gatherv(
	void *sendbuf, int sendcount, MPI_Datatype sendtype,
	void *recvbuf, int *recvcounts, int *displacements, MPI_Datatype recvtype,
	int root, MPI_Comm comm);
// each process sends S values and receives S values, one from each other process
// sendbuf and recvbuf must have size sendcount*S
// S is the number of process
int MPI_Alltoall(
	void *sendbuf, int sendcount, MPI_Datatype sendtype,
	void *recvbuf, int recvcount, MPI_Datatype recvtype,
	MPI_Comm comm);
// receives values from each other processes and reduces them using a basic operator into recvbuf
// note that with MAXLOC/MINLOC recvbuf receives two values (index and value)
// op may be one of MPU_SUM/PROD/MAX/MIN/MAXLOC/MINLOC/LAND/LOR/LXOR
// sendbuf can be replaced by MPI_IN_PLACE to use recvbuf as both the source and destination of the reduction
int MPI_Reduce(
	void *sendbuf, void *recvbuf, int count,
	MPI_Datatype datatype, MPI_Op op, int root, MPI_Comm comm);
// same as Reduce but the result is propagated to all processes
int MPI_Allreduce(
	void *sendbuf, void *recvbuf, int count,
	MPI_Datatype datatype, MPI_Op op, MPI_Comm comm);
```

| Mode | Blocking | Non Blocking |
| - | - | - |
| Standard | MPI_Send | MPI_Isend |
| Synchronous | MPI_Ssend | MPI_Issend |
| Buffered | MPI_Bsend | MPI_Ibsend |
| Receive | MPI_Recv | MPI_Irecv |

Standard calls are buffered for small messages and synchronous for large messages.
`MPI_Ixx` methods take an additional `MPI_Request*` parameter.
```C
int MPI_Wait(MPI_Request *req, MPI_Status *status);
int MPI_Test(MPI_Request *req, int *flag, MPI_Status *status);
```

**Custom types definition**:
```C
// <count> elements
int MPI_Type_contiguous(int count, MPI_Datatype oldType, MPI_Datatype *newType);
// <count>*<blockLength> elements, each block that are offset by <stride> elements (stride starts at the start of the block, not at its end)
int MPI_Type_vector(int count, int blockLength, int stride, MPI_Datatype oldType, MPI_Datatype *newType);
// same but stride specified in bytes
int MPI_Type_hvector(...);
// sum(blockLengths) elements, with each block offset by some number of elements (from the origin, not from the previous block's end)
int MPI_Type_indexed(int blockCount, int *blockLengths, int *blocksOffsets, MPI_Datatype oldType, MPI_Datatype *newType);
// same but blocksOffsets specified in bytes
int MPI_Type_create_hindexed(...);

// portable way to get the size in bytes of MPI_FLOAT and such, does not consider the space between elements
int MPI_Type_size(MPI_Datatype type, int *size);
// by default the extent of a type is the offset between the its last element's end and its first element's begin. It can be modified to create overlapping patterns using MPI_Type_create_resized
int MPI_Type_get_extent(MPI_Datatype type, MPI_Aint *lb, MPI_Aint *extent);

// before using a custom type, it must be commited
int MPI_Type_commit(MPI_Datatype *datatype);
int MPI_Type_free(MPI_Datatype *datatype);
```

**Communicators**
```C
// creates a new communicator, each process sets it color (its sub-comm) and its key, the key is used to order processes with the same color (keys are not necessarily 0,1,...)
int MPI_Comm_split(MPI_Comm commToSplit, int color, int key, MPI_Comm *newComm);
int MPI_Comm_free(MPI_Comm *comm);
// creates a carthesian space division, periods is a boolean array where 1 corresponds to a periodic space (like a torus), reorder is a boolean (often 0)
// if ndims=2 dims={4,2} periods={0,1} and there are 8 processes, they are ordered in a 4x2 grid where processes are connected to there immediate neighbours and edge processes are connected to the other side on the y axis.
int MPI_Cart_create(MPI_Comm oldComm, int ndims, int *dims, int *periods, int reorder, MPI_Comm *newComm);

// organizes the processes in a N dimensional grid, only useful with Cart_shift, if dims is filled with 0s it is to MPI to decide the dimensions of the grid
int MPI_Dims_create(int nproc, int ndims, int *dims);
// when processes are organized in a grid, retrieves the ranks of neighbours (if step=1) processes. direction is the id of the axis (0 along x, 1 along y...)
int MPI_Cart_shift(MPI_Comm comm, int direction, int step, int *rank_prev, int *rank_next);
```

