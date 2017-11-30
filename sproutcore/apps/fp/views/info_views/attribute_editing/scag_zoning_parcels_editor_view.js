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

Footprint.ZoningParcelsEditorView = SC.View.extend({
    classNames: ['footprint-zoning-editor-view'],
    childViews: ['znCodeView', 'cityznCodeView', 'commentView'],

    activeLayer: null,
    activeLayerBinding: SC.Binding.oneWay('Footprint.layerActiveController.content'),

    content: null,
    contentBinding: SC.Binding.oneWay('Footprint.featuresEditController.content'),

    znCodeView: SC.View.extend({
        childViews: ['zoningTitleView', 'zoningSelectView'],
        layout: {height: 40, left: 10, right: 30, top: 20},
        content: null,
        contentBinding: SC.Binding.from('.parentView.content'),

        zoningTitleView: SC.LabelView.extend({
            classNames: ['footprint-bold-title-white-view'],
            textAlign: SC.ALIGN_CENTER,
            backgroundColor: '#3366CC',
            layout: {height: 16},
            value: '2016 SCAG Zoning Code'
        }),

        zoningSelectView: Footprint.SelectInfoView.extend({
            layout: {height: 24, top: 16},
            contentBinding: SC.Binding.oneWay('Footprint.clientLandUseDefinitionController.arrangedObjects'),
            menuWidth: 400,

            // Controller and View selection remain in sync
            selectionBinding: 'Footprint.clientLandUseDefinitionController.selection',
            recordType: Footprint.ClientLandUseDefinition,
            itemTitleKey: 'land_use_description',
            contentKey: 'features',
            contentStatusKey: 'featuresStatus',
            // The controller calls propertyDidChange on this when updates finish. We use it to update value
            refreshValue: null,
            refreshValueBinding: SC.Binding.oneWay('Footprint.featuresEditController.recordsDidUpdate'),

            features: null,
            featuresBinding: SC.Binding.oneWay('.parentView.content'),
            featuresStatus: null,
            featuresStatusBinding: SC.Binding.oneWay('*features.status'),

            // Create a computed property that returns the land_use_definition if all features have the same
            // land_use_definition. This property updates to changes to the features, their status, and the
            // land_use_definition of each.
            value: Footprint.pluralContentValuePropertyCreator('features', 'featuresStatus', 'land_use_definition', 'refreshValue'),
            // The value updates the singleSelection of the controller (which updates the selection of Controller and View)
            // Changing the selection in turn updates the value, which causes all current features values to update
            valueBinding: 'Footprint.clientLandUseDefinitionController.singleSelection'
        })
    }),

    cityznCodeView: Footprint.EditableTextFieldView.extend({
        layout: {height: 40, left: 10, right: 30, top: 80},
        title: '2016 City Zoning Code',
        isEditable:YES,
        contentBinding: SC.Binding.oneWay('.parentView.content'),
        titleViewLayout: { height: 16 },
        editableContentViewLayout: { top: 17 },
        titleClassNames: ['footprint-bold-title-white-view'],
        contentValueKey: 'city_zn_code16',
        value: Footprint.pluralContentValueProperty,
        backgroundColor: '#3366CC'
    }),

    commentView: Footprint.EditableTextFieldView.extend({
        layout: {left: 10, right: 30, height: 100, top: 140},
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
