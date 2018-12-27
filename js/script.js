function Model() {
    var self = this;
    self.data = [];
    self.addItem = function(item) {
        if (item == 0) {
            return;
        }
        self.data.push(item);
        console.log(self.data);
        return self.data;
    };
    self.removeItem = function(item) {
        var index = self.data.indexOf(item);
        if (index === -1) {
            return;
        }
        self.data.splice(index, 1);
        return self.data;
    };
};
function View(model) {
    var self = this;
       function init() {
            var wrapper = tmpl($("#wrapper-todo").html());
            $('body').append(wrapper);
            self.elements = {
                input:$('.item-value'),
                addBtn:$('.item-add'),
                listContainer:$('.item-list')
            }
        self.renderList(model.data);
    };

    self.renderList = function(data) {
        var list = tmpl($("#list-todo").html(), {data:data});
        self.elements.listContainer.html(list);
    };
    init();
};

function Controller(model, view) {
    var self = this;

    view.elements.addBtn.bind('click', addItem);
    function addItem() {
        var newItem = view.elements.input.val();
        model.addItem(newItem);
        view.renderList(model.data);
        view.elements.input.val('');
    }
    
    view.elements.listContainer.on('click', '.item-delete', removeItems);
    function removeItems() {
        var item = $(this).attr('data-value');
        console.log($(this));
        console.log(item);
        model.removeItem(item);
            view.renderList(model.data);
        }
};

$(function() {
    var firstToDoList = [];
    var model = new Model(firstToDoList);
    var view = new View(model);
    var controller = new Controller(model, view);
});