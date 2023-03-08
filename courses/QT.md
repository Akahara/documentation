```cpp
QApplication app;
QPushButton *btn;
/* QObject::connect(QObject& emiter, signal, QObject &receiver, slot) */
QObject::connect(btn, SIGNAL(clicked()), &app, SLOT(quit())); // old
```

```c++
class QCustom : public QObject {
private:
	Q_OBJECT
signals:
	void sig(...);
public slots:
	type slt(...);
}
```

```c++
emit sig(...);
connect(obj1, QCustom::sig, obj2 QCustom::slt); // new
```

```c++
// STL substitutions
class QVector, QList, QQueue;
// additional classes
class QDate, QThread, QFile, QDir, QTimer;
// display
class QApplication, QWidget, QMainWindow;
class QFileDialog, QMessageBox, QProcessDialog  : QDialog;
// views
class QListView, QTableView, QTreeView;

class QAbstractItemDeleguate {
QWidget *createEditor() // creates a widget that will *replace* the edited element while it is being edited
void setEditorData() // called from the model to update the view
void setModelData()  // called from the view to update the model
void updateEditorGeometry()
}
```