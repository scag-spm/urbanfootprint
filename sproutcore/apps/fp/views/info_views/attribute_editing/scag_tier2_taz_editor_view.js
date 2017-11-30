/*
 * UrbanFootprint v1.5
 * Copyright (C) 2017 Calthorpe Analytics
 *
 * This file is part of UrbanFootprint version 1.5
 *
 * UrbanFootprint is distributed under the terms of the GNU General
 * Public License version 3, as published by the Free Software Foundation. This
 * code is distributed WITHOUT ANY WARRANTY, without implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General
 * Public License v3 for more details; see <http://www.gnu.org/licenses/>.
 */


sc_require('views/info_views/editable_text_field_view');
sc_require('views/info_views/attribute_editing/editable_attribute_group_field_views');
sc_require('views/info_views/attribute_editing/editable_layer_info_view');

Footprint.Tier2TazEditorView = SC.View.extend({
    classNames: ['footprint-tier2-taz-editor-view'],
    childViews: ['t2idView', 'basic16DemographicsView', 'basic20DemographicsView', 'basic35DemographicsView',
    'basic45DemographicsView', 'multipleRecordsView', 'commentView'],

    activeLayer: null,
    activeLayerBinding: SC.Binding.oneWay('Footprint.layerActiveController.content'),

    content: null,
    contentBinding: SC.Binding.oneWay('Footprint.featuresEditController.content'),

    isEnabled: function() {
        if (this.get('content') && this.getPath('content.length') === 1) {
            // Disable editing unless the content length is 1
            return this.getPath('content.length') === 1;
        }
    }.property('content').cacheable(),


    t2idView: Footprint.EditableTextFieldView.extend({
        layout: {left: 10, right: 30, height: 45, top: 20},
        title: 'SCAG Tier2TAZ ID',
        titleClassNames: ['footprint-bold-title-white-view'],
        titleBackgroundColor: '#3366CC',
        titleViewLayout: { height: 17, top: 0 },
        isTextArea: YES,
        isEditable:NO,
        contentBinding: SC.Binding.oneWay('.parentView.content'),
        editableContentViewLayout: { top: 17, bottom: 0 },
        contentValueKey: 'tier2',
        refreshValue: null,
        refreshValueBinding: SC.Binding.oneWay('Footprint.featuresEditController.recordsDidUpdate'),
        value: Footprint.pluralContentValueProperty
    }),

    basic16DemographicsView: Footprint.EditablePopHhEmpAttributeGroupView.extend({
        childViews: ['titleView', 'popView', 'hhView', 'empView'],
        layout: {height: 65, left: 10, right: 30, top: 80},
        contentBinding: SC.Binding.oneWay('.parentView.content'),
        popKey: 'pop16',
        hhKey: 'hh16',
        empKey: 'emp16',
        groupTitle: 2016
    }),

    basic20DemographicsView: Footprint.EditablePopHhEmpAttributeGroupView.extend({
        childViews: ['titleView', 'popView', 'hhView', 'empView'],
        layout: {height: 65, left: 10, right: 30, top: 160},
        contentBinding: SC.Binding.oneWay('.parentView.content'),
        popKey: 'pop20',
        hhKey: 'hh20',
        empKey: 'emp20',
        groupTitle: 2020
    }),

    basic35DemographicsView: Footprint.EditablePopHhEmpAttributeGroupView.extend({
        childViews: ['titleView', 'popView', 'hhView', 'empView'],
        layout: {height: 65, left: 10, right: 30, top: 240},
        contentBinding: SC.Binding.oneWay('.parentView.content'),
        popKey: 'pop35',
        hhKey: 'hh35',
        empKey: 'emp35',
        groupTitle: 2035
    }),

    basic45DemographicsView: Footprint.EditablePopHhEmpAttributeGroupView.extend({
        childViews: ['titleView', 'popView', 'hhView', 'empView'],
        layout: {height: 65, left: 10, right: 30, top: 320},
        contentBinding: SC.Binding.oneWay('.parentView.content'),
        popKey: 'pop45',
        hhKey: 'hh45',
        empKey: 'emp45',
        groupTitle: 2045
    }),

    commentView: Footprint.EditableTextFieldView.extend({
        layout: {left: 10, right: 30, height: 100, top: 400},
        title: 'Notes',
        titleClassNames: ['footprint-bold-title-white-view'],
        titleBackgroundColor: '#3366CC',
        titleViewLayout: { height: 17, top: 0 },
        isTextArea: YES,
        isEditable:YES,
        contentBinding: SC.Binding.oneWay('.parentView.content'),
        editableContentViewLayout: { top: 17, bottom: 0 },
        contentValueKey: 'notes',
        // The controller calls propertyDidChange on this when updates finish. We use it to update value
        refreshValue: null,
        refreshValueBinding: SC.Binding.oneWay('Footprint.featuresEditController.recordsDidUpdate'),
        value: Footprint.pluralContentValueProperty
    }),

    multipleRecordsView: SC.View.extend({
        layout: {height: 32, right: 30, top: 530, left: 10},
        classNames: ['footprint-mulitiple-records-view'],
        childViews: ['titleView', 'imageView'],
        content: null,
        contentBinding: SC.Binding.oneWay('.parentView.content'),
        status: null,
        statusBinding: '*content.status',
        // Indicates whether or not the content of the pane is editable and has changed--thus can be saved or cancelled
        isVisible: function() {
            if (this.get('content') && this.getPath('content.length') > 1) {
                return this.getPath('content.length') > 1;
            }
        }.property('content').cacheable(),

        titleView: SC.LabelView.extend({
            layout: {left: 32, right: 40},
            content: null,
            contentBinding: SC.Binding.oneWay('.parentView.content'),
            status: null,
            statusBinding: '*content.status',
            value: function () {
                if (this.get('content') && this.getPath('content.length') > 1) {
                    return '%@ Records Selected; \n Please select 1 Record'.fmt(this.getPath('content.length'))
                }
            }.property('content', 'status').cacheable(),
            textAlign: SC.ALIGN_CENTER
        }),

        imageView: SC.ImageView.extend({
            layout: {width: 24, height: 24, top: 3, left: 8},
            value: sc_static('images/alert.png')
        })
    })
});
