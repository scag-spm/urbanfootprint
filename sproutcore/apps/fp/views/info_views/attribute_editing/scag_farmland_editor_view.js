/*
 * UrbanFootprint v1.5
 * Copyright (C) 2016 Calthorpe Analytics
 *
 * This file is part of UrbanFootprint version 1.5
 *
 * UrbanFootprint is distributed under the terms of the GNU General
 * Public License version 3, as published by the Free Software Foundation. This
 * code is distributed WITHOUT ANY WARRANTY, without implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General
 * Public License v3 for more details; see <http://www.gnu.org/licenses/>.
 */

sc_require('properties/plural_property');
sc_require('views/info_views/select_info_view');
sc_require('views/info_views/editable_text_field_view');


Footprint.FarmlandEditorView = SC.View.extend({
    classNames: ['footprint-farmland-editor-view'],
    childViews: ['farmlandView', 'commentView'],

    activeLayer: null,
    activeLayerBinding: SC.Binding.oneWay('Footprint.layerActiveController.content'),

    content: null,
    contentBinding: SC.Binding.oneWay('Footprint.featuresEditController.content'),

    farmlandView: Footprint.EditableTextFieldView.extend({
        layout: {left: 10, right: 30, top: 20, height: 40},
        title: 'SCAG Farmland Type',
        isEditable:NO,
        contentBinding: SC.Binding.oneWay('.parentView.content'),
        titleViewLayout: { height: 16 },
        editableContentViewLayout: { top: 17 },
        titleClassNames: ['footprint-bold-title-white-view'],
        contentValueKey: 'scag_type',
        value: Footprint.pluralContentValueProperty,
        backgroundColor: '#3366CC'
    }),

    commentView: Footprint.EditableTextFieldView.extend({
        layout: {left: 10, right: 30, height: 100, top: 80},
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
    })
});
