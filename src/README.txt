### Web app logic description

The user will be prompted with different lines containing
3 different checkboxes from one another which corresponds
to the following:

- Read
- Write
- Delete

As soon as one the checkboxes is clicked, its value
will be updated to "checked (true)" or "not checked (false)".

NOTE: when the "delete" checkbox is clicked, the other two needs
to be updated with the "delete" updated value.

In order to do that, I need to being able to track the row which
they belong to. After knowing that, I can proceed with updating
the value. ---> use Map data structure to store as a key
the rowId and as a value an object containing the value of the checkboxes.